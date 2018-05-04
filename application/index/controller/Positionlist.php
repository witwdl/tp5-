<?php

namespace app\index\controller;
use app\index\model\Company as CompanyModel;
use app\index\model\Position as PositionModel;
use think\Controller;
use think\Request;
use think\Db;

class Positionlist extends Controller
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $trade = Db::name('trade')->limit(10)->select();
        $position = PositionModel::all();
        $this->assign('position',$position);
        $this->assign('trade', $trade);
        return view('positionlist/read');
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
        $trade = Db::name('trade')->limit(10)->select();

        // var_dump($id);die;
         // 查询职位信息
        // $sql=PositionModel::all(['jcid'=>$id]);
        // var_dump($sql);die;
        $position = PositionModel::all(['jcid'=>$id]);

        $this->assign('trade',$trade);
        $this->assign('position', $position);
        return view();

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

    public function search(Request $request)
    {
        // 行业分类
        $trade = Db::name('trade')->limit(10)->select();



        $search = $request->get('search');

        $position = new PositionModel();

        $result = $position->where('title','like','%'.$search.'%')->select();

        $this->assign('position',$result);
        $this->assign('trade', $trade);



        return view('positionlist/read');

    }

    /**
     * 行业分类
     * @param $id
     * @return \think\response\View
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */

    public function trade($id)
    {
        $trade = Db::name('trade')->limit(10)->select();
        $company = CompanyModel::all(['tid'=>$id]);

        $position = array();
        foreach ($company as $k=>$v){
            $position = PositionModel::all(['cid'=>$v['id']]);
        }
        $this->assign('position',$position);
        $this->assign('trade', $trade);
        return view('positionlist/read');
    }

    /**
     * 工作年限
     * @param $id
     * @return \think\response\View
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function age($id)
    {

        $trade = Db::name('trade')->limit(10)->select();
        $position = PositionModel::all(['age'=>$id]);
        $this->assign('position',$position);
        $this->assign('trade', $trade);
        return view('positionlist/read');
    }

    /**
     * 学历要求
     * @param $id
     * @return \think\response\View
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */

    public function education($id)
    {
        $trade = Db::name('trade')->limit(10)->select();
        $position = PositionModel::all(['education'=>$id]);
        $this->assign('position',$position);
        $this->assign('trade', $trade);
        return view('positionlist/read');
    }

    public function financing($id)
    {
        $trade = Db::name('trade')->limit(10)->select();
        $company = CompanyModel::all(['financing'=>$id]);

        $position = array();
        foreach ($company as $k=>$v){
            $position = PositionModel::all(['cid'=>$v['id']]);
        }
        $this->assign('position',$position);
        $this->assign('trade', $trade);
        return view('positionlist/read');
    }
}
