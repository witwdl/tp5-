<?php

namespace app\index\controller;

use think\Controller;
use think\Request;

class IndexController extends Controller
{
    public function _initialize()
    {
        $data = \session('memberinfo');


        //判断session是否存在
        if (empty($data['phone'])) {
            //跳转到登录页
            return $this->redirect('index/login/index');
        }

    }
}
