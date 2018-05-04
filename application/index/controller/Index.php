<?php

namespace app\index\controller;
use app\admin\model\BannerModel;
use app\index\model\Position as PositionModel;
use app\admin\model\Company as CompanyModel;
use think\Controller;
use think\Db;


class Index extends Controller
{
    public function index()
    {
        // 查询首页热门职位信息

        $positionnew = PositionModel::all(function ($query){
            $query->limit(6)->order('createtime','desc');
        });
        $positionhot = PositionModel::all(function ($query){
        $query->limit(6)->order('pay','desc');
    });





        //查询友情链接数据
        $link = Db::name('link')->field('title,url')->where('isshow',1)->order('sort','ASC')->select();

        // 职位分类
        $arr=$arr0=Db::name('category')->where('level=1')->select();
        $arr1=$arr1_1=Db::name('category')->where('level=2')->select();//二级菜单
        $arr2=Db::name('category')->where('level=3')->select();

        foreach ($arr1 as $key1 => $value1) {
            foreach ($arr2 as $key2 => $value2) {
                if($value2['upid']==$value1['id']){
                    $arr1_1[$key1]['next'][]=$value2;

                }
            }

        }

        foreach ($arr0 as $key0 => $value0) {
            foreach ($arr1 as $key1 => $value1) {
                if($value1['upid']==$value0['id']){
                    $arr[$key0]['next'][]=$arr1_1[$key1];
                }
            }
        }
        unset($arr0,$arr1,$arr1_1,$arr2);


        //dzy代码部分,循环index页热门公司信息
        $company = CompanyModel::scope('index',8)->select();
        // end
        $banner = BannerModel::all(function ($query){
            $query->limit(2)->where('isdisplay',1);
        });
        $this->assign('banner',$banner);
        $this->assign('arr',$arr);
        $this->assign('link',$link);
        $this->assign('positionhot', $positionhot);
        $this->assign('positionnew', $positionnew);
        $this->assign('company',$company);
        return view('index/index');
    }
}
