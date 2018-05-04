<?php

namespace app\index\controller;

use app\index\model\Link as LinkModel;
use think\Controller;
use think\Request;
use think\Db;

class Link extends Controller
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        //查询友情链接数据
        $link = Db::name('link')->field('title,url')->where('isshow',1)->order('sort','ASC')->select();
        $this->assign('link',$link);
        return view('link/index');
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
        //创建model类实例
        $link = new LinkModel();
        //data送参
        $link->data([
            'title' => $data['title'],
            'url' => $data['url'],
            'remark' => $data ['remark'],
            'createtime' => time(),
            'sort' => 9999,
        ]);
        //返回结果
        if($result = $link->save()) {
            $info['status'] = 1;
            $info['msg'] = '您的申请已提交审核,请耐心等待!';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '您的申请操作失败！,请稍后再试!';
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
