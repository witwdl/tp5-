<?php

namespace app\admin\controller;

use think\Db;
use think\Request;
use upload\Uploadfile;
use think\Cookie;

class Banner extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {

        $list = \app\index\model\Banner::paginate(3,function ($query) {
            $query->order('id', 'des');
        });
        $this->assign('bannerlist', $list);
        return view('banner/index');

    }

    /**
     * 添加轮播图图片
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function save(Request $request)
    {
        $data = self::isPostAjax($request);
        $data['createtime'] = time();
        $img = $_FILES['img'];
        if ($img['error'] != 4) {
            $option = new Uploadfile($img, ROOT_PATH . 'public' . DS . 'uploads', array('image/png', 'image/jpeg', 'image/gif'));
            $filepath = $option->uploadFile();
            if ($filepath) {
                $data['img'] = str_replace(ROOT_PATH . 'public' , '', $filepath);
                $data['img'] = str_replace('\\', '/', $data['img']);
            } else {
                return json(['status'=>2, 'info'=>'上传失败']);
            }
        } else {
            return json(['status'=>2, 'info'=>'图片不能为空']);
        }
        $bannerModel = new \app\index\model\Banner($data);
        $Results = $bannerModel->allowField(true)->save();
        if ($Results) {
            return json(['status'=>1, 'info'=>'添加成功']);
        } else {
            return json(['status'=>2, 'info'=>'添加失败']);
        }
    }

    /**
     *
     * @显示是否显示或隐藏状态
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function lookbanner(Request $request)
    {
        $data = self::isGetAjax($request);
        $bannerModel = new \app\index\model\Banner;
        $Results = $bannerModel->field(['createtime', 'isdisplay'], true)->where($data)->find();
        if ($Results) {
            return json(['status'=>1, 'info'=>$Results]);
        } else {
            return json(['status'=>2]);
        }
    }

    /**
     * 编辑轮播图图片
     * @param Request $request
     * @return \think\response\Json
     */
    public function update(Request $request)
    {
        $data = self::isPostAjax($request);
        $bannerModel = new \app\index\model\Banner;
        $condition['id'] = $data['bannerid'];
        $originimgpath = $bannerModel->where('id', $condition['id'])->column('img');
        $img = $_FILES['img'];
        if ($img['error'] != 4) {
            $option = new Uploadfile($img, ROOT_PATH . 'public' . DS . 'uploads', array('image/png', 'image/jpeg', 'image/gif'));
            $filepath = $option->uploadFile();
            if ($filepath) {
                $updata['img'] = str_replace(ROOT_PATH . 'public' , '', $filepath);
                $updata['img'] = str_replace('\\', '/', $updata['img']);
            } else {
                return json(['status'=>2, 'info'=>'上传失败']);
            }
        } else {
            $updata['img'] = $originimgpath[0];
        }
        $updata['title'] = $data['title'];
        $updata['links'] = $data['links'];
        $Results = $bannerModel->where(['id'=>$condition['id']])->update($updata);
        if ($Results) {
            if ($img['error'] != 4) {
                self::delimg(ROOT_PATH . 'public' . $originimgpath[0]);
            }
            return json(['status'=>1, 'info'=>'更新成功', 'title'=> $updata['title'], 'id' => $condition['id'], 'img' => $updata['img'] ]);
        } else {
            if ($img['error'] != 4) {
                self::delimg(ROOT_PATH . 'public' . $updata['img']);
            }
            return json(['status'=>2, 'info'=>'更新失败']);
        }
    }

    /**
     * 改变显示/隐藏状态
     * @param Request $request
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function changestatus(Request $request)
    {
        $data = self::isGetAjax($request);
        $op = $data['op'];
        $condition['id'] = $data['id'];
        if ($op == 'show') {
            $updata['isdisplay'] = 1;
            $res = Db::name('banner')->where($condition)->update($updata);
        } else {
            $updata['isdisplay'] = 2;
            $res = Db::name('banner')->where($condition)->update($updata);
        }
        if ($res) {
            return json(['status'=>1, 'info'=>'操作成功']);
        } else {
            return json(['status'=>2, 'info'=>'操作失败']);
        }
    }

    /**
     * 删除轮播图
     * @param Request $request
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    public function delete(Request $request)
    {
        $data = self::isGetAjax($request);

        $imgpath = Db::name('banner')->field('img')->where(['id'=>$data['id']])->find();
        $path = ROOT_PATH . 'public' . $imgpath['img'];
        $res = Db::name('banner')->where(['id'=>$data['id']])->delete();
        if ($res) {
            self::delimg($path);
            return json(['status'=>1, 'info'=>"删除成功"]);
        } else {
            return json(['status'=>2, 'info'=>'删除失败']);
        }
    }

    /**
     * 判断AJAX传输是否为POST
     * @param Request $request
     * @return mixed|void
     */
    protected function isPostAjax(Request $request)
    {
        /**
         * 判断请求是否是ajax请求
         */
        if (!Request::instance()->isAjax()) {
            Cookie::clear('flt_');
            return $this->error('页面不存在', url('admin/index/login'));
        }
        return $request->post();
    }

    /**
     *  判断AJAX传输是否为GET
     * @param Request $request
     * @return mixed|void
     */
    protected function isGetAjax(Request $request)
    {
        /**
         * 判断请求是否是ajax请求
         */
        if (!Request::instance()->isAjax()) {
            Cookie::clear('flt_');
            return $this->error('页面不存在', url('admin/index/login'));
        }
        return $request->get();
    }

    protected function delimg($filepath)
    {
        $filepath = str_replace('\\', '/', $filepath);
        if (file_exists($filepath)) {
            unlink($filepath);
        }
    }

}
