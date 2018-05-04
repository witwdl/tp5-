<?php
use my\Sms;
use my\Phpmailer;
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

// qq登录
function https_request($url)
{
    // 初始化
    $ch = curl_init();
    // 设置
    curl_setopt($ch,CURLOPT_URL,$url);
    // 检查ssl证书
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,FALSE);
    // 从检查本地证书检查是否ssl加密
    curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,$url);

    // 判断$data 判断是否post
    if ( !empty($data) ) {
        curl_setopt($ch,CURLOPT_POST,1);// 开启post
        curl_setopt($ch,CURLOPT_POSTFIELDS,$data);// 发送post $data

    }
    // 返回结果 是文件流的方式返回
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $res = curl_exec($ch);
    curl_close($ch); // close curl res
    return $res;
}


/**
 * 发送模板短信
 * @param to 手机号码集合,用英文逗号分开
 * @param datas 内容数据 格式为数组 例如：array('Marry','Alon')，如不需替换请填 null
 * @param $tempId 模板Id,测试应用和未上线应用使用测试模板请填写1，正式应用上线后填写已申请审核通过的模板ID
 */
function sendSMS($to, $datas, $tempId)
{
    //主帐号,对应开官网发者主账号下的 ACCOUNT SID
    $accountSid = '8a216da85f2a7aa1015f2ce8fbba001f';

//主帐号令牌,对应官网开发者主账号下的 AUTH TOKEN
    $accountToken = '7e28d2c295204122982440c8f5e32557';

//应用Id，在官网应用列表中点击应用，对应应用详情中的APP ID
//在开发调试的时候，可以使用官网自动为您分配的测试Demo的APP ID
    $appId = '8aaf07086077a6e60160b480d48e1736';

//请求地址
//沙盒环境（用于应用开发调试）：sandboxapp.cloopen.com
//生产环境（用户应用上线使用）：app.cloopen.com
    $serverIP = 'app.cloopen.com';


//请求端口，生产环境和沙盒环境一致
    $serverPort = '8883';

//REST版本号，在官网文档REST介绍中获得。
    $softVersion = '2013-12-26';
    // 初始化REST SDK
//    global $accountSid, $accountToken, $appId, $serverIP, $serverPort, $softVersion;
    $rest = new Sms($serverIP, $serverPort, $softVersion);
    $rest->setAccount($accountSid, $accountToken);
    $rest->setAppId($appId);

    // 发送模板短信
//    echo "Sending TemplateSMS to $to <br/>";
    $result = $rest->sendTemplateSMS($to, $datas, $tempId);
    return $result;
    if ($result == NULL) {
        echo "result error!";

    }
    if ($result->statusCode != 0) {
        echo "error code :" . $result->statusCode . "<br>";
        echo "error msg :" . $result->statusMsg . "<br>";
        //TODO 添加错误处理逻辑
    } else {
        echo "Sendind TemplateSMS success!<br/>";
        // 获取返回信息
        $smsmessage = $result->TemplateSMS;
        echo "dateCreated:" . $smsmessage->dateCreated . "<br/>";
        echo "smsMessageSid:" . $smsmessage->smsMessageSid . "<br/>";
        //TODO 添加成功处理逻辑
    }
}

//Demo调用
//**************************************举例说明***********************************************************************
//*假设您用测试Demo的APP ID，则需使用默认模板ID 1，发送手机号是13800000000，传入参数为6532和5，则调用方式为           *
//*result = sendTemplateSMS("13800000000" ,array('6532','5'),"1");																		  *
//*则13800000000手机号收到的短信内容是：【云通讯】您使用的是云通讯短信模板，您的验证码是6532，请于5分钟内正确输入     *
//*********************************************************************************************************************

function sendEmailCode($to,$username,$title,$code)
{
    $mail = new PHPMailer(); //建立邮件发送类
    $mail->CharSet = "UTF-8";
    $address ="admin@falitu.com";
    $mail->IsSMTP(); // 使用SMTP方式发送
    $mail->Host = "smtp.qq.com"; // 您的企业邮局域名
    $mail->SMTPAuth = true; // 启用SMTP验证功能
    $mail->Username = "admin@falitu.com"; // 邮局用户名(请填写完整的email地址)
    $mail->Password = "xlqrscfeduycbjfd"; // 邮局密码
    $mail->Port= 587;
    $mail->From = "admin@falitu.com"; //邮件发送者email地址
    $mail->FromName = "法力兔招聘网";
    $mail->AddAddress($to,$username);//收件人地址，可以替换成任何想要接收邮件的email信箱,格式是AddAddress("收件人email","收件人姓名")
//$mail->AddReplyTo("", "");

//$mail->AddAttachment("/var/tmp/file.tar.gz"); // 添加附件
    $mail->IsHTML(true); // set email format to HTML //是否使用HTML格式

    $mail->Subject = "法力兔招聘网{$title}--请勿回复"; //邮件标题
    $mail->Body = "您的验证码是: {$code}"; //邮件内容，上面设置HTML，则可以是HTML

    if(!$mail->Send())
    {
        echo "邮件发送失败. <p>";
        echo "错误原因: " . $mail->ErrorInfo;
        exit;
    }
}
