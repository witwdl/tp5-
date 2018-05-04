<?php
namespace upload;
/**
 *文件上传类
 */
class Uploadfile
{
    //设置成员属性
    protected $file;		//文件信息
    protected $upload_dir;	//保存的目录
    protected $allow_type;	//允许的类型
    protected $file_size;	//允许的大小

    //执行的时候,生成的属性
    protected $message;		//保存错误信息
    protected $full_dir;	//生成的保存文件的目录
    protected $file_name;	//生成的文件名


    /**
     *构造方法:设置初始值
     *@param array $file		文件的信息
     *@param string $uplaod_dir 保存的目录
     *@param array $allow_type	允许的类型
     *@param int $file_size		允许的文件大小
     */
    public function __construct(
        $file,
        $upload_dir = '/uploads',
        $allow_type = array(
            'application/x-zip-compressed',
            'application/octet-stream',
            'application/x-gzip',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ),
        $file_size = 2097152)
    {
        $this->file = $file;
        $this->upload_dir = $upload_dir;
        $this->allow_type = $allow_type;
        $this->file_size = $file_size;
    }

    /*
     *判断文件的上传的错误
     */
    protected function checkError()
    {
        //判断错误号
        if (!empty($this->file)) {
            //判断错误类型
            if ($this->file['error'] != 0) {
                switch ($this->file['error']) {
                    case 1 : $this->message =  '上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值';break;
                    case 2 : $this->message =   '上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值';break;
                    case 3 : $this->message =   '文件只有部分被上传';break;
                    case 4 : $this->message =   '没有文件被上传';break;
                    case 6 : $this->message =   '找不到临时文件夹';break;
                    case 7 : $this->message =   '文件写入失败';break;
                }
                return false;
            } else {
                return true;
            }
        } else {
            $this->message = '没有传递数据';
            return false;
        }
    }

    /**
     *判断是否是被允许的类型
     */
    protected function checkType()
    {
        //判断类型是否是被允许的
        if (!in_array($this->file['type'], $this->allow_type)) {
            $this->message =  '上传文件的类型不允许';
            return false;
        }
        return true;
    }

    /**
     *判断文件的大小
     */
    protected function checkSize()
    {
        //判断文件的大小
        if ($this->file_size > 0  && $this->file['size'] > $this->file_size) {
            $this->message = '文件过大';
            return false;
        }
        return true;
    }

    /**
     *创建一个目录
     */
    protected function makeDir()
    {
        //根据数据创建目录
        $time_dir = date('Ymd',time());
        $this->full_dir = $this->upload_dir.'/'.$time_dir;

        //判断目录是否存在
        if (!file_exists($this->full_dir)) {
            mkdir($this->full_dir, 0777, true);
        }
    }

    /**
     *生成一个文件名
     */
    protected function getUniName()
    {
        //获取原来文件的后缀名
        $extension = pathinfo($this->file['name'], PATHINFO_EXTENSION);

        //随机一个文件名
        $this->file_name = md5(microtime(true)).'.'.$extension;

    }

    /**
     *显示错误信息
     */
    protected function showError()
    {
        die("<span style='color:red;font-size:30px'>{$this->message}</span>");
    }

    /**
     *完成文件的上传
     */
    public function uploadFile()
    {
        //判断所有的条件
        if ($this->checkError() && $this->checkType() && $this->checkSize()) {
            //创建目录
            $this->makeDir();
            //创建文件名
            $this->getUniName();
            //获取完整的保存路径
            $full_path = $this->full_dir.'/'.$this->file_name;

            //判断是否是合法的上传方式
            if (is_uploaded_file($this->file['tmp_name'])) {
                if (move_uploaded_file($this->file['tmp_name'], $full_path)) {
                    //返回的是由函数本身生成的地址:$time_dir.'/'.$file_name;
                    return $full_path;
                } else {
                    $this->message = '上传失败';
                    $this->showError();
                }
            } else {
                $this->message = '上传方式不合法';
                $this->showError();
            }
        } else {
            $this->showError();
        }
    }
}