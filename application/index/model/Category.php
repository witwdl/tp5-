<?php

namespace app\index\model;

use think\Model;

class Category extends Model
{
    // 定义关联
    public function position()
    {
        return $this->hasMany('position','jcid');
    }
}
