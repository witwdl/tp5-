<?php

namespace app\admin\model;

use think\Model;

class Resume extends Model
{
    public function getSexAttr($value)
    {
        $sex = [1=>'男',2=>'女'];
        return $sex[$value];
    }
}
