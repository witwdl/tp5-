<?php

namespace app\admin\controller;

use think\Db;
use think\Request;
use app\admin\model\MemberModel;
class Member extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $list = MemberModel::paginate(10,function ($query) {
            $query->order('id', 'des');
        });


        $this->assign('list',$list);
        return view('member/index');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        return view('member/add');
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
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
            'phone' => $list['phone'],
            'email' => $list['email'],
            'password' => sha1($list['userpass']),
            'type' => $list['type'],
            'regtime' => time(),
	    'active' => 1,
            'regip' => ip2long($request->ip()),
        ];
        $result = Db::name('member')->insert($data);

        if ($result) {
            $this->success('恭喜您，新增会员成功！', 'admin/member/index');
        } else {
            $this->error('抱歉，新增会员失败！');
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

    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = DB::name('member')->field('password',true)->where('id',$id)->find();
        $this->assign('data',$data);
        return view('member/edit');
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
            'username' => $info['username'],
            'phone' => $info['phone'],
            'email' => $info['email'],
            'password' => sha1($info['userpass']),
            'type' => $info['type'],
            'regtime' => time(),
            'regip' => ip2long($request->ip()),
        ];


        $result = Db::name('member')->where('id', $id)->update($data);

        if ($result) {
            $this->success('恭喜您，会员资料修改成功！', 'admin/member/index');
        } else {
            $this->error('很抱歉，会员资料修改失败！');
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
        $result = Db::name('member')->delete($id);

        if ($result > 0) {
            $info['status'] = true;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的会员删除成功!';
        } else {
            $info['status'] = false;
            $info['id'] = $id;
            $info['info'] = $info['info'] = 'ID为: ' . $id . '的会员删除失败！';
        }

        return json($info);
    }

    public function active($id, $active)
    {
        if ($active == 0) {
            $this->error('用户还未激活不能禁用！');
        } else if ($active == 1) {
            $active = 2;
            Db::name('member')->where('id', $id)->update(['active' => $active]);
            $this->success('会员禁用成功！', 'admin/member/index');
        } else {
            $active = 1;
            Db::name('member')->where('id', $id)->update(['active' => $active]);
            $this->success('会员启用成功！', 'admin/member/index');
        }
    }
}
