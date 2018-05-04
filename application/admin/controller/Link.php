<?php

namespace app\admin\controller;

use think\Db;
use think\Request;
use app\admin\model\LinkModel;
class Link extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        // 分页处理
        $list = LinkModel::paginate(10,function ($query) {
            $query->order('sort','ASC');
        });
        $this->assign('list',$list);
        return view('link/index');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        return view('link/add');
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
            'title' => $data['title'],
            'url' => $data['url'],
            'createtime' => time(),
            'isshow' => $data['isshow'],
            'sort' => 9999,
            'remark' => $data['remark']
        ];


        $result = Db::name('link')->insert($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '恭喜您，友链新增成功!';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '很抱歉，友链新增失败!';
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
        if (!empty($id)) {
            //查询留言数据库
            $data = Db::name('link')->field(true)->where('id',$id)->find();
        }

        $this->assign('data',$data);
        return view('link/edit');
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
            'title' => $data['title'],
            'url' => $data['url'],
            'updatetime' => time(),
            'isshow' => $data['isshow'],
            'sort' => $data['sort'],
            'remark' => $data['remark']
        ];


        $result = Db::name('link')->where('id',$id)->update($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '恭喜您，友链更新成功!';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '很抱歉，友链更新失败!';
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
        $result = Db::name('link')->delete($id);

        if ($result > 0) {
            $info['status'] = true;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的友链删除成功!';
        } else {
            $info['status'] = false;
            $info['id'] = $id;
            $info['info'] = $info['info'] = 'ID为: ' . $id . '的友链删除失败！';
        }

        return json($info);
    }
}
