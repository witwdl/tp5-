<?php

namespace app\admin\model;

use think\Model;

class Company extends Model
{
    //开启自动写入时间
    protected $autoWriteTimestamp = true;

    //financing原始数据读取器
    protected function getCompanyFinancingAttr($value,$data)
    {
        return $data['financing'];
    }

    //financing数据读取器
    protected function getFinancingAttr($value)
    {
        $financing = [1=>'未融资',2=>'天使轮',3=>'A轮',4=>'B轮',5=>'C轮',6=>'D轮及以上',7=>'上市公司',8=>'不需要融资'];
        return $financing[$value];
    }


    //tid原始数据
    //financing原始数据读取器
    protected function getCompanyTidAttr($value,$data)
    {
        return $data['tid'];
    }

    //tid数据读取器
    protected function getTidAttr($value)
    {
        $tid = [1=>'移动互联网',2=>'电子商务',3=>'金融',4=>'企业服务',5=>'教育',6=>'文化娱乐',7=>'游戏'
            ,8=>'O2O',9=>'硬件',10=>'医疗健康',11=>'生活服务',12=>'广告营销',13=>'旅游',14=>'数据服务',
            15=>'社交网络',16=>'分类信息',17=>'信息安全',18=>'招聘',19=>'其他'];
        return $tid[$value];
    }

    //scale原始数据获取器
    protected function getCompanyScaleAttr($value,$data)
    {
        return $data['scale'];
    }

    //scale获取器
    protected function getScaleAttr($value)
    {
        $scale = [1=>'0-15人',2=>'15-50人',3=>'50-100人',4=>'100-200人',5=>'200-500人',6=>'500人以上'];
        return $scale[$value];
    }

    //首页显示公司数量limit控制
    protected function scopeIndex($query,$limit)
    {
        $query->where('active',1)->limit($limit);
    }


    public function comments()
    {
        return $this->hasMany('Comment','cid');
    }

    public function commentss()
    {
        return $this->hasMany('Comment','uid');
    }


}
