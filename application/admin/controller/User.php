<?php

namespace app\admin\controller;

use think\Request;
use think\Db;
use app\admin\model\UserModel;


class User extends AdminController
{

    //空方法跳转
    public function _empty()
    {
        return '11111';
    }

    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        //查询数据
        $list = Db::name('user')->select();



        //声明一个空数组
        $arr = [];

        //遍历用户信息
        foreach($list as $v) {
            $role_ids = Db::name('user_role')->field('rid')->where('uid',$v['id'])->select();
            //声明空数组
            $roles = [];
            //遍历
            foreach($role_ids as $j) {
                $roles[] = Db::name('role')
                    ->where('status = 1 AND id = '.$j['rid'])
                    ->select();
            }
            $v['role'] = $roles;   //将新得到的角色信息放入到$v中
            $arr[] = $v;
        }


        $this->assign('list', $arr);
        return view('user/index');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        return view('user/add');
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $list = $request->post();

        if ($list['userpass'] !== $list['reuserpass']) {
            $this->error('两次输入密码不一样，请重新填写！');
        }

        $data = [
            'username' => $list['username'],
            'name' => $list['name'],
            'userpass' => sha1($list['userpass']),
        ];
        $result = Db::name('user')->insert($data);

        if ($result) {
            $this->success('恭喜您，新增管理员成功！', 'admin/user/index');
        } else {
            $this->error('抱歉，新增管理员失败！');
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

    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int $id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = Db::name('user')->where('id', $id)->find();
        $this->assign('data', $data);
        return view('user/edit');
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
            'username' => $info['username'],
            'name' => $info['name'],
            'userpass' => sha1($info['userpass']),
        ];

        $result = Db::name('user')->where('id', $id)->update($data);

        if ($result) {
            $this->success('恭喜您，用户修改成功！', 'admin/user/index');
        } else {
            $this->error('很抱歉，用户修改失败！');
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

        //如果id是管理员不可以被删除
        if ($id == 1) {
            $this->error('很抱歉,不能删除admin账号!');
        }

        //check是否有角色分配
        $checkrole = Db::name('user_role')->field(true)->where('uid', $id)->select();

        if (!empty($checkrole)) {
            $this->error('很抱歉,请先取消角色分配！');
        }

        //检查用户自己删除自己
        $uid = session('admininfo')['id'];
        if ($id == $uid) {
            $this->error('很抱歉,不能删除自己的账号!');
        }


        //执行删除管理员操作
        $result = Db::name('user')->delete($id);

        if ($result > 0) {
            $info['status'] = true;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的用户删除成功!';
        } else {
            $info['status'] = false;
            $info['id'] = $id;
            $info['info'] = $info['info'] = 'ID为: ' . $id . '的用户删除失败！';
        }

        return json($info);
    }


    public function active($id, $active)
    {
        if ($active == 0) {
            $active = 1;
        } else {
            $active = 0;
        }

        Db::name('user')->where('id', $id)->update(['active' => $active]);
        return $this->success('用户状态修改成功！', 'admin/user/index');
    }

    public function test()
    {
        return view('user/test');
    }

    public function role($id)
    {
        $user = Db::name('user')->where('id', $id)->find();

        $list = Db::name('role')->field('id,name')->select();

        $data = Db::name('user_role')->field('rid')->where('uid', $id)->select();


        $checked = [];

        foreach ($data as $v) {
            $checked[] = $v['rid'];
        }


        $this->assign('user', $user);
        $this->assign('list', $list);
        $this->assign('checked', $checked);
        return view('user/role');
    }

    public function roleup(Request $request)
    {
        $data = $request->post();


        if (empty($data['rid'])) {
            $data['rid'] = [];
        }

        $uid = $data['id'];
        $rid = $data['rid'];


        $result = '';

        // 启动事务
        Db::startTrans();

        try {

            Db::name('user_role')->where('uid', $uid)->delete();

            if (!empty($rid[0])) {
                foreach ($rid as $v) {

                    $data = [
                        'uid' => $uid,
                        'rid' => $v
                    ];
                    $result = Db::name('user_role')->insert($data);
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
            $this->success('恭喜您，角色分配成功！', 'admin/user/index');
        } else {
            $this->error('很抱歉，角色分配失败！');
        }
    }

}
