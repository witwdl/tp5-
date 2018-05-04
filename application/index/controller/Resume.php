<?php

namespace app\index\controller;

use app\index\model\Education;
use app\index\model\WorkExperience;
use think\Controller;
use think\Request;
use app\index\model\Resume as ResumeModel;
use think\response\Redirect;

class Resume extends IndexController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        // 根据session id 差用户简历
        $id = session('memberinfo')['id'];
        $resume = new ResumeModel();
        $result = $resume->where('mid',$id)->find();
        if (empty($result)){
            return view('resume/create');
        }
         // 根据简历才工作经验
        $workExperience = WorkExperience::all(['rid'=>$result['id']]);
        if ($workExperience){
            $this->assign('work',$workExperience);
        }else{
            $workExperience = null;
            $this->assign('work',$workExperience);
        }
        // 根据简历查学历
        $education = Education::all(['rid'=>$result['id']]);

        if ($education){
            $this->assign('education',$education);
        }else{
            $education= null;
            $this->assign('education',$education);
        }


        $this->assign('result',$result);
        return view();
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
     * 保存新建的简历
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $data = $request->post();


        //处理企业logo上传
        if ($request->file('headPic')) {
            // 获取表单上传文件
            $file = request()->file('headPic');




            if ($file) {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'resumepic');
                if ($info) {
                    $result['code'] = 1;
                    $result['msg'] = '图片上传成功';
                    $result['data']['src'] = strtolower($info->getSaveName());
                    return json($result);
                } else {
                    $result['code'] = 0;
                    $result['msg'] = "{$file->getError()}";
                    $result['data']['src'] = '';
                    return json($result);
                }
            }
        }

//        dump($data);die;
        // 简历信息
       if ($data){
            $resume = new ResumeModel();
            $result = $resume->allowField(true)->save($data);
            if ($result > 0 ){
                $this->redirect('index/resume/index');
            }
            $this->success('添加失败');
       }

      $this->success('请勿非法操作');
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        $data = ResumeModel::get(['mid'=>$id]);
        if ($data) {
            $info['status'] = 1;
            $info['rid'] = $data['id'];

            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '请先添加简历';
            return json($info);
        }
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        $this->assign('id',$id);
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

    /**
     * 加载 工作经历添加
     * @return \think\response\View
     * $id   简历id
     */
    public function creatework($id)
    {
        $this->assign('rid',$id);
        return view();
    }

    /**
     * 执行工作经历添加
     */
    public function savework(Request $request)
    {

        $data = $request->post();
        $workexperience = new WorkExperience();
        $result = $workexperience->save($data);
        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '新增成功';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '新增失败';
            return json($info);
        }
    }

    /**
     * 加载更新工作经历
     * @param $id
     * @return \think\response\View
     * @throws \think\exception\DbException
     */
    public function editwork($id)
    {

        $result = WorkExperience::get($id);

        $this->assign('result',$result);
        return view();
    }

    /**
     * 执行更新
     * @param $id
     * @return \think\response\View
     * @throws \think\exception\DbException
     */
    public function updatework(Request $request)
    {


        $data = $request->post();

        $result = WorkExperience::update($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '更新成功';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '更新失败';
            return json($info);
        }

    }

    /**
     * 新增教育经历
     * @param $id 简历ID
     * @return \think\response\View
     */
    public function createeducation($id)
    {
        $this->assign('rid',$id);
        return view();
    }

    /**
     * 执行添加教育经历
     * @param Request $request
     * @return \think\response\Json
     */

    public function saveeducation(Request $request)
    {

        $data = $request->post();
        $education = new Education();
        $result = $education->save($data);
        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '新增成功';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '新增失败';
            return json($info);
        }
    }

    /**
     * 加载更新教育
     * @param $id 简历
     * @return \think\response\View
     * @throws \think\exception\DbException
     */
    public function editeducation($id)
    {

        $result = Education::get($id);

        $this->assign('result',$result);
        return view();
    }


    /**
     * 执行学历更新
     * @param $id
     * @return \think\response\View
     * @throws \think\exception\DbException
     */
    public function updateeducation(Request $request)
    {


        $data = $request->post();

        $result = Education::update($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '更新成功';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '更新失败';
            return json($info);
        }

    }

    /**
     * 加载简历编辑
     * @param $id
     * @return \think\response\View
     * @throws \think\exception\DbException
     */

    public function editresume($id)
    {
       $result =  ResumeModel::get($id);
       $this->assign('result', $result);
       return view();
    }

    /**
     * 更新简历
     * @param Request $request
     */
    public function updateresume(Request $request)
    {
        $data = $request->post();


        $result =ResumeModel::update($data);
        if (!empty($result)){
            $this->redirect('index/resume/index');
        }

        $this->error('更改失败');
    }
}
