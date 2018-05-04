<?php

namespace app\admin\controller;

use app\admin\model\Education;
use app\admin\model\RoleModel;
use think\Controller;
use think\Db;
use think\Request;
use app\admin\model\Resume as ResumeModel;

class Resume extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
//        $resume =model('resume');
//        $data =   Db::name('resume')->select();
        $list = ResumeModel::paginate(10,function ($query) {
            $query->order('id', 'des');
        });

        $this->assign('data',$list);

        return view();
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
        //
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        $result = \app\admin\model\Resume::get(['id'=>$id]);
        $work = Db::name('work_experience')->where('rid',$id)->select();
        $data = Education::get(['rid'=>$id]);



        $this->assign('result',$result);
        $this->assign('work',$work);
        $this->assign('data',$data);
        return view();
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

    /**
     * 简历状态 修改
     * @param $id
     * @param $active
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function active($id,$active)
    {


        if ($active == 1) {
            $active = 2;
        } else {
            $active = 1;
        }

        $result = Db::name('resume')->where('id', $id)->update(['active' => $active]);

        if ($result) {
            $this->success('恭喜您,简历状态修改成功！','admin/resume/index');
        } else {
            $this->error('很抱歉,简历状态修改失败！');
        }
    }
}
