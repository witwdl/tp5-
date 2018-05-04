<?php

namespace app\admin\controller;

use app\index\model\Category;
use think\Controller;
use think\Request;
use think\Db;

class Position extends AdminController
{
    /**
     * 显示分类列表
     *
     * @return \think\Response
     */
    public function index()
    {
//        $list = Db::name('category')->order('level','des')->select();
        $list = Category::paginate(10,function ($query){
                $query->order('level','des');
        });
        $this->assign('list', $list);
        return view();
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        return view();
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

        $result = Db::name('category')->insert($info);

        if ($result) {
            return $this->success('分类添加成功！', 'admin/position/index');
        } else {
            return $this->error('抱歉，新增分类失败！');
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
        $data = Db::name('category')->where('id', $id)->find();
        $this->assign('data', $data);
        return view();
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
            'level' => $info['level'],
            'upid' => $info['upid']
        ];

        $result = Db::name('category')->where('id', $id)->update($data);
        if ($result) {
            $this->success('恭喜您，分类修改成功！','admin/position/index');
        } else {
            $this->error('很抱歉，分类修改失败！');
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
        $result = Db::name('category')->delete($id);
        
        if ($result > 0) {
            // 成功
            $info['status'] = true;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的分类删除成功!';
        } else {
            // 失败
            $info['status'] = false;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的分类删除失败,请重试!';
        }
        return json($info);
    }

    /**
     * 添加子分类
     * @param $id  父级分类ID
     * @return \think\response\View
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */

    public function subcreate($id)
    {
        $data = Db::name('category')->where('id', $id)->find();

        $info['upid'] = $data['id'];
        $info['level'] =$data['level'] + 1;

        $this->assign('info',$info);
        return view();
    }


}
