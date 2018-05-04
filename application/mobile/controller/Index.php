<?php
namespace app\mobile\controller;

use app\index\model\Position as PositionModel;
use think\Controller;
use think\Db;
use think\Request;
use think\Session;

class Index extends Controller
{
    public function index()
    {
        $position = Db::view('position','id,cid,title,pay,isdisplay,createtime')
            ->view('company','id,name,img_url','position.cid=company.id')
            ->select();

        $member = session('memberinfo');

        $this->assign('member',$member);
        $this->assign('position', $position);
        return view('index/index');
    }

    public function read($id)
    {
        $job = Db::view('position')
            ->view('company','id,name,img_url,approve','position.cid=company.id')
            ->where('id',$id)
            ->find();

        $member = session('memberinfo');

        $this->assign('member',$member);
        $this->assign('job',$job);
        return view('index/read');
    }

    public function login()
    {
        if (session('memberinfo')) {
            $this->redirect('mobile/index/index');
        } else {
            return view('index/login');
        }
    }

    public function logout()
    {
        Session::clear();
        $this->redirect('mobile/index/index');
    }

    public function doLogin(Request $request)
    {
        $data =  $request->post();

        $result = Db::name('member')
            ->field('id,username,phone,email,password')
            ->where('email|phone',$data['username'])
            ->where('password', sha1($data['password']))
            ->where('active',1)
            ->find();

        if ($result) {
            //存用户session

            if (empty($result['username'])) {
                $result['username'] = $result['email'];
            }

            session('memberinfo',$result);
            $info['code'] = 1;
            $info['msg'] = '用户登录成功！';
            return json($info);
        } else {
            $info['code'] = 0;
            $info['msg'] = '手机/邮箱或密码错误！';
            return json($info);
        }
    }

    public function register()
    {
        return view('index/register');
    }

    public function checkEmail(Request $request)
    {
        $data = $request->post();

        if (empty($data['email'])) {
            exit;
        }

        $result = Db::name('member')->where('email',$data['email'])->find();

        if (empty($result)) {
            $info['code'] = 1;
            $info['msg'] = '可正常注册';
            return json($info);
        } else {
            $info['code'] = 0;
            $info['msg'] = '用户已存在！';
            return json($info);
        }


    }

    public function doRegister(Request $request)
    {
       $temp = $request->post();

       if($temp['password'] !== $temp['repassword']) {
            $info['code'] = 0;
            $info['msg'] = '两次密码不相等，请重新输入！';
            return json($info);
       }

       if ($temp['ecode'] != \session('emailcode')) {
           $info['code'] = 0;
           $info['msg'] = '邮箱验证码错误，请重新输入！';
           return json($info);
       }

        $data = [
            'email' => $temp['username'],
            'password' => sha1($temp['password']),
            'regtime' => time(),
            'type' => 0,
            'active' => 1,
        ];
       
       $result = Db::name('member')->insert($data);

       if ($result) {
           $info['code'] = 1;
           $info['msg'] = '恭喜您,用户创建成功！';
           return json($info);
       } else {
           $info['code'] = 0;
           $info['msg'] = '用户创建失败，请稍后再试！';
           return json($info);
       }
    }

    public function sendEmail(Request $request)
    {
        $data = $request->post();

        //生成随机数存入session
        Session::set('emailcode', mt_rand(1000, 9999));

        $emailcode = session('emailcode');

        sendEmailCode($data['email'],$data['email'],'注册验证码',$emailcode);

    }

}
