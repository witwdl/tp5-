<?php

namespace app\index\controller;

use think\Controller;
use think\Request;
use think\Db;
class Register extends Controller
{
    public function index()
    {
        return view();
    }

    public function telCreat(Request $request)
    {
        $info=$request->post();
        if ( $info['password']!=$info['repassword']){
            return $this->success('两次密码不一致', 'index/register/index');
        }

        $captcha = new \think\captcha\Captcha();
        if (!$captcha->check($info['code'])) {
            return $this->success('验证码错误，请重新输入！', 'index/register/index');
        }

        if ($info['smscode'] != session('smscode')) {
            $this->error('短信验证码错误,请重新输入!', 'index/register/index');
        }
        $info = [
            'phone' => $info['tel'],
            'password'=> sha1($info['password']),
            'regtime'=>time(),
	    'active' => 1,
        ];
        $date = Db::name('member')->insertGetId($info);
        if (!empty($date)){
            $memberinfo=[
                'id'=>$date,
                'phone'=>$info['phone']
                ];
            session('memberinfo',$memberinfo);
            $this->redirect('index/index');
        }else{
             $this->error('注册失败', 'index/register/index');

        }
    }
}
