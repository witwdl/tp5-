<?php

namespace app\index\model;


use think\Model;

class Position extends Model
{

    protected function getAgeAttr($value)
    {
        $age  = [ 0=>'不限',1=>'应届毕业生',2=>'三年以下',3=>'3-5年',4=>'5-10年',5=>'10年以上',6=>'无要求'];
        return $age [$value];

    }
    protected function getEducationAttr($value)
    {
        $education  = [ 0=>'不限',1=>'大专',2=>'本科',3=>'硕士',4=>'博士',5=>'无要求'];
        return $education[$value];

    }

// 定义关联方法
    public function company()
    {
        // 公司HAS ONE档案关联
        return $this->hasOne('Company','id','cid');
    }


}

