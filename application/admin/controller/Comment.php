<?php

namespace app\admin\controller;

use app\admin\model\Comment as CommentModel;
use think\Request;
use think\Db;
class Comment extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {

        $list = CommentModel::paginate(10,function ($query) {
            $query->order('id', 'des')->field(true);
        });



        $this->assign('list',$list);

        return view('comment/index');

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
        if (!empty($id)) {
            //查询留言数据库
            $data = Db::name('comment')->where('id',$id)->find();
        }

        $this->assign('data',$data);
        return view('comment/edit');
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
            'status' => $data['status'],
            'comment' => $data['comment'],
        ];


        $result = Db::name('comment')->where('id',$id)->update($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '恭喜您，评论更新成功!';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '很抱歉，评论更新失败!';
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
        $result = Db::name('comment')->delete($id);

        if ($result > 0) {
            $info['status'] = true;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的评论删除成功!';
        } else {
            $info['status'] = false;
            $info['id'] = $id;
            $info['info'] = $info['info'] = 'ID为: ' . $id . '的评论删除失败！';
        }

        return json($info);
    }

    public function status(Request $request)
    {
        $data = $request->param();


        //处理数据
        $data = [
            'id' => $data['id'],
            'status' => $data['status'],
        ];

        if ($data['status'] == 0) {
            //改变审核状态
            $result = Db::name('comment')->where('id',$data['id'])->update(['status'=>1]);
        } else {
            //如果已审核返回result为0,避免再次更新数据库
            $result = 0;
        }



        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '评论审核通过!';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '审核已通过,请勿重复操作!';
            return json($info);
        }
    }
}
