<?php

namespace app\index\controller;
use app\index\model\Company as CompanyModel;
use think\Controller;
use think\Request;
use think\Db;

class Position extends Controller
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {

        return view('position/index');
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
       
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
//        dump($id);die;
        //查询职位信息详细
        $position = Db::name('position')
            ->where('id',$id)
            ->find();
        $this->assign('position', $position);


        $company = CompanyModel::get(['id'=>$position['cid']]);

        // end
        $this->assign('company', $company);
//        dump($company);die;

        return view('position/read');

        // return view();
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
