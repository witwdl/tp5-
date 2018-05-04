<?php

namespace app\admin\controller;


use think\Db;

class Main extends AdminController
{
    /**
     * 后台主页
     * @return \think\response\View
     */
    public function index()
    {

        $phone = Db::name('member')->whereNotNull('phone')->count('id');
        $member = Db::name('member')->count('id');
        $email = Db::name('member')->whereNotNull('email')->count('id');
        $openid = Db::name('member')->whereNotNull('openid')->count('id');
        $active = Db::name('member')->where('active',1)->count('id');
        $this->assign('phone',$phone);
        $this->assign('member',$member);
        $this->assign('email',$email);
        $this->assign('openid',$openid);
        $this->assign('active',$active);

        return view('admin@main/index');
    }
}
