<?php

namespace app\admin\controller;

use think\Controller;
use think\Request;
use think\Validate;
use think\Session;
use think\Db;

class Index extends Controller
{
    /**
     * 后台登录页面
     * @return \think\response\View
     */
    public function index()
    {
        $data = \session('admininfo');

        if (!empty($data['username'])) {
            return $this->redirect('admin/main/index');
        }

        return view('admin@index/login');
    }

    /**
     * 后台登录处理
     * @return \think\response\View
     */
    public function login(Request $request)
    {

        $data = $request->post();

        $validate = new Validate([
            'username' => 'require|min:4|max:20',
            'userpass' => 'require',
            'code' => 'require'
        ]);

        $data = [
            'username' => $data['username'],
            'userpass' => sha1($data['userpass']),
            'code' => strtolower($data['code'])
        ];

        //检测数据是否合法
        if (!$validate->check($data)) {
            return $this->error($validate->getError());
        }

        //检测验证码是否正确
        $captcha = new \think\captcha\Captcha();
        if (!$captcha->check($data['code'])) {
            return $this->success('验证码错误，请重新输入！','admin/index/index');
        }

        //对比数据库
        $result = Db::name('user')
            ->field('id,name,username')
            ->where('username',$data['username'])
            ->where('userpass',$data['userpass'])
            ->find();


        if ($result) {
            //存储session
            Session::set('admininfo',$result);

            //查询用户权限
            $list = Db::name('user')
                ->alias('u')
                ->field('mname,aname')
                ->join('user_role ur','u.id=ur.uid')
                ->join('role_node rn','ur.rid=rn.rid')
                ->join('node n','rn.nid=n.id')
                ->where('u.id',$result['id'])
                ->select();

            //控制器名首字母转换为大写
            foreach ($list as $key => $val) {
                $list[$key]['mname'] = ucfirst($val['mname']);
            }

            $nodelist = array();
            $nodelist['Position'] = array('index');
            $nodelist['Main'] = array('index');

            //遍历重新拼装
            foreach($list as $v){
                $nodelist[$v['mname']][] = $v['aname'];
                //把修改和执行修改 添加和执行添加 拼装到一起
                if($v['aname']=="create"){
                    $nodelist[$v['mname']][]="save";
                }
                if($v['aname']=="edit"){
                    $nodelist[$v['mname']][]="update";
                }
            }

            //存储权限session
            Session::set('adminnodelist',$nodelist);

            return $this->success('恭喜您，登录成功！','admin/main/index');
        } else {
            return $this->error('账号或密码错误！');
        }
    }

    /**
     * 后台登出处理
     * @return \think\response\View
     */
    public function logout()
    {
        Session::clear();
        $this->redirect('admin/index/index');
    }

}
