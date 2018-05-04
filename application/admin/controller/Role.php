<?php

namespace app\admin\controller;

use think\Db;
use think\Request;
use app\admin\model\RoleModel;

class Role extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $list = RoleModel::paginate(10,function ($query) {
            $query->order('id', 'des');
        });
        $this->assign('list', $list);
        return view('role/index');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        return view('role/add');
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $info = $request->post();

        $data = [
            'name' => $info['name'],
            'status' => 1,
            'remark' => $info['remark']
        ];

        $result = Db::name('role')->insert($data);

        if ($result) {
            $this->success('恭喜您，新增角色成功！', 'admin/role/index');
        } else {
            $this->error('抱歉，新增角色失败！');
        }
    }

    /**
     * 显示指定的资源
     *
     * @param  int $id
     * @return \think\Response
     */
    public function read($id)
    {
        //
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int $id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = Db::name('role')->where('id', $id)->find();
        $this->assign('data', $data);
        return view('role/edit');
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request $request
     * @param  int $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        $info = $request->put();

        $data = [
            'name' => $info['name'],
            'remark' => $info['remark'],
        ];

        $result = Db::name('role')->where('id', $id)->update($data);

        if ($result) {
            $this->success('恭喜您，角色修改成功！', 'admin/role/index');
        } else {
            $this->error('很抱歉，角色修改失败！');
        }
    }

    /**
     * 删除指定资源
     *
     * @param  int $id
     * @return \think\Response
     */
    public function delete($id)
    {

        $checknode = Db::name('role_node')->field(true)->where('rid',$id)->select();

        if (!empty($checknode)) {
            $this->error('请先取消用户角色后再删除角色！');
        }

        $result = Db::name('role')->delete($id);
        if ($result > 0) {
            $info['status'] = true;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的用户删除成功!';
        } else {
            $info['status'] = false;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的用户删除失败,请重试!';
        }
        return json($info);
    }

    public function active($id, $active)
    {
        if ($active == 0) {
            $status = 1;
        } else {
            $status = 0;
        }

        $result = Db::name('role')->where('id', $id)->update(['status' => $status]);

        if ($result) {
            $this->success('恭喜您,角色状态修改成功！', 'admin/role/index');
        } else {
            $this->error('很抱歉,角色状态修改失败！');
        }
    }

    public function node($id)
    {
        //查询角色名
        $rolename = Db::name('role')->field('id,name')->find($id);

        //已有的权限
        $data = Db::name('role_node')->field('nid')->order('nid', 'asc')->where('rid', $id)->select();

        //所有权限节点
        $list = Db::name('node')->where('status', 1)->select();

        $checked = [];

        foreach ($data as $v) {
            $checked[] = $v['nid'];
        }


        $this->assign('list', $list);
        $this->assign('rolename', $rolename);
        $this->assign('checked', $checked);
        return view('role/node');
    }

    public function nodeup(Request $request)
    {
        $data = $request->post();

        if (empty($data['nid'])) {
            $data['nid'] = [];
        }

        $rid = $data['id'];
        $nid = $data['nid'];

        // 启动事务
        Db::startTrans();

        try {

            Db::name('role_node')->where('rid', $rid)->delete();

            if (!empty($nid[0])) {
                foreach ($nid as $v) {

                    $data = [
                        'rid' => $rid,
                        'nid' => $v
                    ];
                    $result = Db::name('role_node')->insert($data);
                }
            } else {
                $result = 1;
            }
            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
        }

        if ($result) {
            $this->success('恭喜您，权限修改成功！', 'admin/role/index');
        } else {
            $this->error('很抱歉，权限修改失败！');
        }

    }


}
