<?php

namespace app\index\controller;

use think\Controller;
use think\Db;
use think\Request;

class Cast extends IndexController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        //
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        //
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $data = $request->post();
        $result= Db::name('company_resume')->where($data)->find();
        if (empty($result)){
            $result = Db::name('company_resume')->insert($data);
            if ($result) {
                $info['status'] = 1;
                $info['msg'] = '更投递成功,请耐心等待消息';
                return json($info);
            } else {
                $info['status'] = 0;
                $info['msg'] = '投递失败';
                return json($info);
            }
        }else{
            $info['status'] = 0;
            $info['msg'] = '已投过';
            return json($info);
        }

    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        //
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {
        //
    }
}
