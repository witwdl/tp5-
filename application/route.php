<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;

Route::get('/', 'index/index');

//user module route
Route::post('user/roleup','admin/user/roleup');
Route::resource('user','admin/user');
Route::get('user/active/:id/:active$','admin/user/active');
Route::get('user/role/:id$','admin/user/role');

// 绑定路由
Route::get('bind/bind/:openid','index/bind/bind');
Route::post('bind/dobind','index/bind/dobind');
Route::post('bind/userbind','index/bind/userbind');
Route::post('bind/smsPhoneBind','index/bind/smsPhoneBind');


Route::resource('bind','index/bind');

//role module route
Route::post('role/nodeup','admin/role/nodeup');
Route::resource('role','admin/role');
Route::get('role/active/:id/:active$','admin/role/active');
Route::get('role/node/:id$','admin/role/node');
//  company module route
Route::get('address/[:upid]','admin/address/index');
Route::resource('company','admin/company');
//node module route
Route::get('node/delete/:id','admin/node/delete');
Route::resource('node','admin/node');
Route::get('node/active/:id/:active$','admin/node/active');

// 简历route
Route::get('resume/active/:id/:active$','admin/resume/active');
Route::resource('resume','admin/resume');
//link module route
Route::resource('link','admin/link');
// 前台分类查询
Route::resource('indexcategory','index/category');
// 简历投递
Route::resource('cast','index/cast');
// 前台简历
Route::get('indexresume/editresume/:id','index/resume/editresume');
Route::post('indexresume/savework/','index/resume/savework');
Route::post('indexresume/saveeducation/','index/resume/saveeducation');
Route::post('indexresume/updatework/','index/resume/updatework');
Route::post('indexresume/updateeducation/','index/resume/updateeducation');
Route::get('indexresume/editwork/:id','index/resume/editwork');
Route::get('indexresume/editeducation/:id','index/resume/editeducation');
Route::get('indexresume/creatework/:id','index/resume/creatework');
Route::get('indexresume/createeducation/:id','index/resume/createeducation');
Route::resource('indexresume','index/resume');
// position module route
//Route::post('position/savesub','admin/position/savesub');
Route::get('position/subcreate/:id','admin/position/subcreate');
Route::resource('position','admin/position');

// occupation module route
Route::resource('occupation','admin/occupation');



//sendSMS route
Route::get('send/:tel','index/login/send');

//member module route
Route::resource('member','admin/member');
Route::get('member/active/:id/:active$','admin/member/active');


//QQ CallBack address
Route::get('qqlogin','index/login/qqlogin');


//banner route
//Route::get('banner', 'admin/banner/index');
Route::resource('banner', 'admin/banner');
Route::post('addbanner', 'admin/banner/save');
Route::get('lookbanner', 'admin/banner/lookbanner');
Route::post('editbanner', 'admin/banner/update');
Route::get('bannerches', 'admin/banner/changestatus');
Route::get('delbanner', 'admin/banner/delete');


//comment RESTful route
Route::resource('comment','admin/comment');
Route::get('comment/:status/:id','admin/comment/status');


//mobile route
Route::resource('mobile','mobile/index');
Route::get('mobile/login','mobile/index/login');

//前台友情链接路由
Route::get('links','index/link/index');

//前台公司列表路由
Route::resource('gongsi','index/company');

//前台职位路由
Route::resource('zhiwei','index/position');

//前台职位列表路由
Route::resource('list','index/positionlist');
// 搜索
Route::get('search','index/positionlist/search');
Route::get('trade','index/positionlist/trade');
Route::get('nianxian/:id','index/positionlist/age');
Route::get('education/:id','index/positionlist/education');
Route::get('financing/:id','index/positionlist/financing');



//main routes
Route::get('main','admin/main/index');

//login index page route
Route::get('admin$','admin/index/index');

//forgot password page route
Route::get('reset','index/login/reset');
Route::get('ereset','index/login/ereset');

//sendSMS route
Route::get('send/:tel','index/login/send');

//login page route

Route::post('login','admin/index/login');
Route::get('register','index/register/index');


//login page route
Route::get('login','index/login/index');

//logout route
Route::get('logout','admin/index/logout');
Route::get('exit','index/login/logout');
//fixed empty moudle
Route::get(':name$','index/index/index');

