<?php

namespace app\index\controller;

use think\captcha\Captcha;
use think\Controller;
use think\Db;
use think\Request;
use think\Session;

class Login extends Controller
{
    public function index()
    {
        //检测有无session存在，如有session，直接跳转到首页
        if (!empty(session('memberinfo'))) {
            $this->redirect('index/index');
        }

        //检测有无cookie,拿cookie和数据库进行对比，数据验证通过，给用户生成session再跳回到首页
        if(!empty(cookie('memberinfo'))) {
            $cookie = cookie('memberinfo');

            $info = Db::name('member')->field('id,username,email,phone,password')->where('id',$cookie['id'])->find();

            if (($cookie['email'] == $info['email'] || $cookie['phone'] == $info['phone']) && $cookie['password'] == $info['password']) {
                //存用户session
                Session::set('memberinfo', $info);
                $this->redirect('index/index');
            }

        }
        return view('login/index');
    }

    public function login(Request $request)
    {

        //获取登录信息
        if (Request::instance()->isPost()) {

            $info = $request->post();

            //邮箱登录
            if (!empty($info['email'])) {
                //验证电子邮箱
                if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/", $info['email'])) {
                    $this->error('请输入正确的电子邮箱!');
                }

                //password加密与数据库对比
                $info['password'] = sha1($info['password']);

                $result = Db::name('member')
                    ->field('id,username,phone,email,password')
                    ->where('email', $info['email'])
                    ->where('password', $info['password'])
                    ->find();
            }

            //手机登录
            if (!empty($info['phone'])) {

                //检测手机号合法性
                if (!preg_match("/^\d{11}$/", $info['phone'])) {
                    $this->error('请输入正确的手机号码!');
                }

                //检测坏人验证是否合法
                if (!captcha_check($info['code'])) {
                    $this->error('坏人检测未通过!请三思...');
                }

                //检测验证码是否合法
                if ($info['smscode'] != session('smscode')) {
                    $this->error('短信验证码错误,请重新输入!');
                }


                //与数据库比对
                $result = Db::name('member')
                    ->field('id,username,email,phone,password')
                    ->where('phone', $info['phone'])
                    ->find();
            }

            //查询到对应数据,存储用户session
            if (!empty($result)) {
                //存用户session
                Session::set('memberinfo', $result);

                if (!empty($info['remember'])) {
                    //初始化cookie
                    //保存用户cookie
                    cookie('memberinfo',$result,604800);
                }

                $this->redirect('index/index');
            } else {
                $this->error('用户名或密码错误,请重新登录!', 'index/login/index');
            }

        } else {
            $this->error('非法请求!');
        }
    }


    public function logout() {
        Session::set('memberinfo','');
        $this->redirect('index/index');
    }

    public function send($tel)
    {
        if (Request::instance()->isAjax()) {

            //生成随机数存入session
            Session::set('smscode', mt_rand(1000, 9999));

            $smscode = session('smscode');

            $result = sendSMS($tel, array($smscode, 500), 1);

            return json($result);

        } else {
            $this->error('非法请求');
        }

    }


    public function sendMailCode()
    {
        if (Request::instance()->isAjax()) {

            //生成随机数存入session
            Session::set('emailcode', mt_rand(1000, 9999));

            $emailcode = session('emailcode');

            $result = sendEmail($email, $emailcode);

            return json($result);

        } else {
            $this->error('非法请求');
        }

    }


    /**
     * QQ 登录
     * @param Request $request
     * @return \think\response\View
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function qqlogin(Request $request)
    {
        $code = $request->get();
        // Step3：通过Authorization Code获取Access Token
        $token_url = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=101453770&client_secret=4cce181d3bdf7e5bbe5d96aef625c423&code=' . $code['code'] . '&state=falitu&redirect_uri=http://www.falitu.com/qqlogin';

        $token_res = https_request($token_url);
        $data = explode('&', $token_res);
        $data = explode('=', $data[0]);

        $token = $data[1];


        // Step4：使用Access Token来获取用户的OpenID
        $openid_url = 'https://graph.qq.com/oauth2.0/me?access_token=' . $token;

        $openid_res = https_request($openid_url);
        if (strpos($openid_res, "callback") !== false) {
            $lpos = strpos($openid_res, "(");
            $rpos = strrpos($openid_res, ")");
            $openid_res = substr($openid_res, $lpos + 1, $rpos - $lpos - 1);
            $msg = json_decode($openid_res, true);

        }
        $openid = $msg['openid'];
        $result = Db::name('member')->field('password',true)->where('openid', $openid)->find();
        if (empty($result)) {
            $this->redirect('index/bind/bind',['openid'=>$openid]);
        }else{
            session('memberinfo',$result);
            $this->redirect('index/index');
        }

        // Step5：使用Access Token以及OpenID来访问和修改用户数据
        $userinfo_url = 'https://graph.qq.com/user/get_user_info?access_token=' . $token . '&oauth_consumer_key=101453770&openid=' . $openid;
        // 判断用户是否登录
        $userinfo_res = https_request($userinfo_url);
        var_dump($userinfo_res);
    }


    //找回密码页面加载
    public function reset()
    {
        return view('login/reset');
    }

    //找回密码step1
    public function passReset(Request $request)
    {
        if ($request->isAjax()) {

            $data = $request->post();


            //检测验证码是否正确
            if (!captcha_check($data['code'])) {
                $this->error('验证码错误,请重新输入！');
            }


            //检测手机验证码是否正确
            if ($data['smscode'] != session('smscode')) {
                $this->error('短信验证码错误,请重新输入!');
            }


            //检测手机号是否存在
            if (!empty($data['phone'])) {
                $result = Db::name('member')->where('phone', $data['phone'])->find();

                if ($result) {
                    $info['status'] = 1;
                    $info['msg'] = '查询用户存在';
                    return json($info);
                } else {
                    $info['status'] = 0;
                    $info['msg'] = '查询用户不存在';
                    return json($info);
                }
            }

        }
    }

    //找回密码step2
    public function saveRest(Request $request)
    {
        if ($request->isAjax()) {

            $data = $request->post();

            //server端对比密码两次密码是否相同
            if ($data['password'] !== $data['repassword']) {
                $this->error('两次输入的密码不相同!');
            }

            //将密码加密 sha1
            $data = [
                'phone' => $data['phone'],
                'password' => sha1($data['password'])
            ];

            //修改密码
            $result = Db::name('member')->where('phone', $data['phone'])->update($data);

            if ($result) {
                $info['status'] = 1;
                $info['msg'] = '恭喜您,密码修改成功!';
                return json($info);
            } else {
                $info['status'] = 0;
                $info['msg'] = '很抱歉,新密码不能与旧密码相同!';
                return json($info);
            }

        }
    }

    //找回密码-邮箱step1
    public function eReset()
    {
        return view('login/ereset');
    }

    //找回密码-邮箱step2
    public function epassRest(Request $request)
    {
        if ($request->isAjax()) {

            $data = $request->post();

            //检测验证码是否正确
            if (!captcha_check($data['code'])) {
                //定义错误信息
                $info['status'] = 2;
                $info['msg'] = '验证码错误, 请重新输入!';
                return json($info);
            }


            //检测手机号是否存在
            if (!empty($data['email'])) {
                $result = Db::name('member')->where('email', $data['email'])->find();

                if ($result) {
                    //邮箱存在,生成验证链接,处理发送邮件逻辑

                    //生成验证码随机数
                    $emailcode = strtoupper(md5(mt_rand(1, 99999)));
                    //存入session
                    Session::set('emailcode', $emailcode);

                    //发送Email验证码
                    sendEmailCode($result['email'], $result['username'], '密码找回', $emailcode);

                    $info['status'] = 1;
                    $info['msg'] = '查询邮箱存在';
                    return json($info);
                } else {
                    $info['status'] = 0;
                    $info['msg'] = '查询用户不存在,请先注册用户!';
                    return json($info);
                }
            }

        }
    }

    //找回密码-邮箱step3
    public function epassRestSave(Request $request)
    {

        $info = $request->post();
        //验证邮箱验证码是否正确
        if ($info['ecode'] == \session('emailcode')) {
            $info['status'] = 1;
            $info['msg'] = '验证码效验完成';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '验证码效验失败,请重新尝试!';
            return json($info);
        }
    }

    //找回密码-邮箱step4
    public function epassRestUpdate(Request $request)
    {

        if ($request->isAjax()) {

            $data = $request->post();

            //server端对比密码两次密码是否相同
            if ($data['password'] !== $data['repassword']) {
                $this->error('两次输入的密码不相同!');
            }

            //将密码加密 sha1
            $data = [
                'email' => $data['email'],
                'password' => sha1($data['password'])
            ];

            //修改密码
            $result = Db::name('member')->where('email', $data['email'])->update($data);

            if ($result) {
                $info['status'] = 1;
                $info['msg'] = '恭喜您,密码修改成功!';
                return json($info);
            } else {
                $info['status'] = 0;
                $info['msg'] = '很抱歉,新密码不能与旧密码相同!';
                return json($info);
            }

        }

    }


    // 生成前台验登录证码
    public function code()
    {
        $config = [
            'codeSet' => '0123456789',
            // 验证码字体大小
            'fontSize' => 16,
            // 验证码位数
            'length' => 4,
            // 背景色
            'bg' => [255, 255, 255],
            // 关闭验证码杂点
            'useNoise' => false,
            // 是否画混淆曲线
            'useCurve' => false,
        ];
        $captcha = new Captcha($config);
        return $captcha->entry();
    }

}
