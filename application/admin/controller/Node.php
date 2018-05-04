<?php

namespace app\admin\controller;

use app\admin\model\NodeModel;
use think\Db;
use think\Request;


class Node extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {

        $list = NodeModel::paginate(10,function ($query) {
        $query->order('id', 'des');
        });
        $this->assign('list', $list);
        return view('node/index');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        return view('node/add');
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $info = $request->post();

        $data = [
            'name' => $info['name'],
            'mname' => $info['mname'],
            'aname' => $info['aname'],
            'status' => 1
        ];

        $result = Db::name('node')->insert($data);

        if ($result) {
            return $this->success('恭喜您，权限新增成功！', 'admin/node/index');
        } else {
            return $this->error('抱歉，权限新增失败！');
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
        $data = Db::name('node')->where('id', $id)->find();
        $this->assign('data', $data);
        return view('node/edit');
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
        $info = $request->put();

        $data = [
            'name' => $info['name'],
            'mname' => $info['mname'],
            'aname' => $info['aname']
        ];

        $result = Db::name('node')->where('id', $id)->update($data);

        if ($result) {
            $this->success('恭喜您，权限修改成功！','admin/node/index');
        } else {
            $this->error('很抱歉，权限修改失败！');
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
        // 删除指定节点
        $result = Db::name('node')->delete($id);
        if ($result > 0) {
            // 成功
            $info['status'] = true;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的节点删除成功!';
        } else {
            // 失败
            $info['status'] = false;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的节点删除失败,请重试!';
        }
        return json($info);
    }

    public function active($id,$active)
    {

        if ($active == 0) {
            $status = 1;
        } else {
            $status = 0;
        }

        $result = Db::name('node')->where('id', $id)->update(['status' => $status]);

        if ($result) {
            $this->success('恭喜您,权限状态修改成功！','admin/node/index');
        } else {
            $this->error('很抱歉,权限状态修改失败！');
        }
    }

}
