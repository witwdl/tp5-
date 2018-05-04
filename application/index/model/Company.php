<?php

namespace app\index\model;

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

    public function trade()
    {

        // 行业HAS ONE档案关联
        return $this->hasOne('Trade','id','tid');
    }

    public function position()
    {

        // 行业HAS ONE档案关联
        return $this->hasMany('position','cid','id');
    }
//    public function position()
//    {
//        return $this->belongsTo('position','id','cid');
//    }

}
