<?php

namespace app\admin\model;

use think\Model;

class Education extends Model
{
    public function getBackgroundAttr($value)
    {
        $background = [1=>'高中',2=>'大专',3=>'本科',4=>'研究生',5=>'博士'];
        return $background[$value];
    }
}
