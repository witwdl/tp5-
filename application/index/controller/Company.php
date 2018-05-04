<?php

namespace app\index\controller;


use app\admin\model\Address;
use app\admin\model\Comment as CommentModel;
use app\admin\model\Company as CompanyModel;
use app\admin\model\Member;
use think\Controller;
use think\Request;
use think\Db;


class Company extends Controller
{
    public function index()
    {
//        推荐公司
        $hotlist = CompanyModel::all(function ($query){
            $query->where('active',1)->limit(5)->order('id','desc');
        });

        //dzy代码部分,循环index页热门公司信息
        $list = CompanyModel::where('active',1)->paginate(8);
        // end
        $this->assign('list', $list);
        $this->assign('hotlist', $hotlist);

        return view('company/index');
    }

    public function read($id)
    {
        $data = CompanyModel::get($id);
        $city = Address::get($data['province']);

        if (!empty(session('memberinfo')['id'])) {
            $uid = session('memberinfo')['id'];
        } else {
            $uid = '';
        }

        $comment = $data->comments()->where('status',1)->select();

        foreach($comment as $v) {
            $v['uid'] =  Member::get(['id'=>$v['uid']]);
        }


        $this->assign('comment',$comment);
        $this->assign('uid',$uid);
        $this->assign('city',$city);
        $this->assign('data',$data);
        return view('company/read');
    }

    public function save(Request $request)
    {
        $data = $request->post();

        $result = CommentModel::create($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '评论成功!';
            $info['text'] = $data['comment'];
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '评论失败,请稍后重试!';
            return json($info);
        }

    }
}
