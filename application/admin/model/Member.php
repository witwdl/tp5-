<?php

namespace app\admin\model;

use think\Model;

class Member extends Model
{
    public function comments()
    {
        return $this->hasMany('Comment','uid');
    }
}
