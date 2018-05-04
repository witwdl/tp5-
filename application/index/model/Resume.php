<?php

namespace app\index\model;

use think\Model;

class Resume extends Model
{
    protected $autoWriteTimestamp = true;

    // maxbackground数据读取器
    protected function getMaxbackgroundAttr($value)
    {
        $maxbackground = [1=>'高中',2=>'大专',3=>'本科',4=>'研究生',5=>'博士',6=>'其他'];
        return $maxbackground[$value];
    }
//
    protected function getWorkDateAttr($value)
    {
        $work_date = [ 0=> '应届毕业生',1=>'1年',2=>'2年',3=>'3年',4=>'4年',5=>'5年',6=>'6年',7=>'7年',8=>'8年以上'];
        return $work_date[$value];
    }

    // 定义关联
    public function work()
    {
        return $this->hasMany('WorkExperience','id','id');
    }
}
