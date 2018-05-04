<?php

namespace app\admin\model;

use think\Model;

class UserModel extends Model
{
    protected $table = 'flt_user';

    public function roles()
    {
        // 用户 BELONGS_TO_MANY 角色
        return $this->belongsToMany('RoleModel', 'flt_user_role');
    }
}
