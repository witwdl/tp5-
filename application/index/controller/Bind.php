<?php

namespace app\index\controller;

use think\Controller;
use think\Db;
use think\Request;

class Bind extends Controller
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {

    }

    /**
     * 加载绑定页面
     * @return \think\response\View
     */
    public function bind()
    {

        $openid = Request::instance()->param('openid');
        $this->assign('openid', $openid);
        return view('login/bind');
    }

    public function dobind()
    {

        $info = Request::instance()->post();

        if ($info['password'] != $info['repassword']) {
            $this->error('两次密码不一致');
        }

        $captcha = new \think\captcha\Captcha();
        if (!$captcha->check($info['code'])) {
            $this->error('验证码错误，请重新输入！');
        }

        if ($info['smscode'] != session('smscode')) {
            $this->error('短信验证码错误,请重新输入!');
        }

        $info = [
            'phone' => $info['phone'],
            'password' => sha1($info['password']),
            'openid' => $info['openid'],
            'regtime' => time(),
        ];
        $result = Db::name('member')->insertGetId($info);
        $data = ['id' => $result, 'openid' => $info['openid'], 'phone' => $info['phone']];
        session('memberinfo', $data);
        if (!empty(session('member'))) {

            return json($result);
        } else {

            return json($result);
        }
    }

    public function userbind()
    {
        // 获取post 数据
        $info = Request::instance()->post();
        // 处理数据
        $phone = $info['phone'];
        $password = sha1($info['password']);
        // 判断是否存在
        $result = Db::name('member')->field('password',true)->where('phone',$phone)->where('password',$password)->find();
        if ($result){
            // 绑定openid
            $data =Db::name('member')->where('id',$result['id'])->update(['openid'=>$info['openid']]);
            if ($data){
                session('memberinfo', $result);
                $data=['typecode'=>1,'msg'=>'绑定成功'];

                return json($data);
            }else{
                $data=['typecode'=>2,'msg'=>'失败成功'];

                return json($data);
            }
        }
        // 无此注册手机
        $data=['typecode'=>3,'msg'=>'无此用户或用户密码不正确'];
        return json($data);
    }

    public function smsPhoneBind()
    {
        $info = Request::instance()->post();
        $phone = $info['phone'];
        $openid = $info['openid'];
        $memberinfo = Db::name('member')->where('phone',$phone)->find();
        if ($memberinfo){
            $result = Db::name('member')->where('phone',$phone)->update(['openid'=>$openid]);
            if(!empty($result)){
                // 添加openid 成功存session
                session('memberinfo', $memberinfo);
                $data=['typecode'=>1,'msg'=>'绑定成功'];

                return json($data);
            }
            $data=['typecode'=>2,'msg'=>'绑定失败'];

            return json($data);
        }
        $data=['typecode'=>3,'msg'=>'此手机未注册'];

        return json($data);

    }
}

