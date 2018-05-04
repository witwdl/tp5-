<?php

namespace app\admin\controller;
use app\index\model\Position as PositionModel;
use think\Request;
use think\Db;

class Occupation extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $list = PositionModel::paginate(10,function ($query) {
            $query->order('id', 'des');
        });
        $this->assign('list', $list);

        return view('occupation/index');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        $list =  Db::name('company')->field(true)->select();
        $this->assign('list',$list);
        $list =  Db::name('category')->field(true)->where('level', 3)->select();
        $this->assign('categorylist', $list);
        return view('occupation/add');

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
        $data = [
            'cid' => $data['cid'],
            'jcid' => $data['jcid'],
            'title' => $data['title'],
            'pay' => $data['pay'],
            'age' => $data['age'],
            'education' => $data['education'],
            'isdisplay' => $data['isdisplay'],
            'createtime' => time(),
            'lure' => $data['lure'],
            'content' => $data['content']
        ];

        $result = Db::name('position')->insert($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '恭喜您，职位信息新增成功!';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '很抱歉，职位信息新增失败!';
            return json($info);
        }
//        var_dump($result);die;
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        // dump($id);
        $data = PositionModel::get(['id'=>$id]);

        $this->assign('data', $data);
        // dump($data);die;
        return view('occupation/read');

    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {

        $data = Db::name('position')->where('id', $id)->find();
        $list= Db::name('company')->field('name')->field('id')->select();
//        dump($list);die;
        $categorylist= Db::name('category')->field('name')->field('id')->where('level', 3)->select();
        $this->assign('list', $list);
        $this->assign('categorylist', $categorylist);
        $this->assign('data', $data);
        return view('occupation/edit');
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
        $data = $request->put();
        $data = [
            'cid' => $data['cid'],
            'jcid' => $data['jcid'],
            'title' => $data['title'],
            'pay' => $data['pay'],
            'age' => $data['age'],
            'education' => $data['education'],
            'isdisplay' => $data['isdisplay'],
            'createtime' => time(),
            'lure' => $data['lure'],
            'content' => $data['content']
        ];


        $result = Db::name('position')->where('id',$id)->update($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '恭喜您，职位更新成功!';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '很抱歉，职位更新失败!';
            return json($info);
        }
    }

 /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {

        $result = Db::name('position')->delete($id);
        if ($result > 0) {
            $info['status'] = true;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的职位删除成功!';
        } else {
            $info['status'] = false;
            $info['id'] = $id;
            $info['info'] = $info['info'] = 'ID为: ' . $id . '的职位删除失败！';
        }


        return json($info);
     }



}
