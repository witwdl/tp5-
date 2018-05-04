<?php

namespace app\admin\controller;

use app\admin\model\Company as CompanyModel;
use app\admin\model\Address as AddressModel;
use app\admin\model\Trade as TradeModel;
use app\admin\model\Trade;
use think\Db;
use think\Request;

class Company extends AdminController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $list = CompanyModel::paginate(10,function ($query) {
            $query->where(['active' => 1]);
        });
        $this->assign('list', $list);
        return view('company/index');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        $province = AddressModel::all(['upid' => 0]);
        $this->assign('province', $province);
        return view('company/add');
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request $request
     * @return \think\Response
     */
    public function save(Request $request)
    {

        $data = $request->post();

        //处理企业logo上传
        if ($request->file('img_url')) {
            // 获取表单上传文件
            $file = request()->file('img_url');

            if ($file) {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'companylogo');
                if ($info) {
                    $result['code'] = 1;
                    $result['msg'] = '图片上传成功';
                    $result['data']['src'] = strtolower($info->getSaveName());
                    return json($result);
                } else {
                    $result['code'] = 0;
                    $result['msg'] = "{$file->getError()}";
                    $result['data']['src'] = '';
                    return json($result);
                }
            }
        }

        $result = CompanyModel::create([
            'name' => $data['name'],
            'link' => $data['link'],
            'intro' => $data['intro'],
            'financing' => $data['financing'],
            'province' => $data['province'],
            'city' => $data['city'],
            'county' => $data['county'],
            'address' => $data['address'],
            'img_url' => $data['img_url'],
            'scale' => $data['scale'],
            'tid' => $data['tid'],
	    'active' => 1,
        ]);

        if ($result) {
            $result['status'] = 1;
            $result['msg'] = '企业新增成功!';
            return json($result);
        } else {
            $result['status'] = 0;
            $result['msg'] = '企业新增失败!';
            return json($result);
        }
    }


    /**
     * 显示指定的资源
     *
     * @param  int $id
     * @return \think\Response
     */
    public function read($id)
    {

        $data = CompanyModel::get($id);
        $this->assign('data', $data);
        return view('company/read');
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int $id
     * @return \think\Response
     */
    public function edit($id)
    {
        if (!empty($id)) {
            $data = CompanyModel::get($id);
        }


        $province = AddressModel::all(['upid' => 0]);

        $pro = AddressModel::get(['id' => $data['province']]);
        $city = AddressModel::get(['id' => $data['city']]);
        $coun = AddressModel::get(['id' => $data['county']]);


        $this->assign('data', $data);
        $this->assign('province', $province);
        $this->assign('pro', $pro);
        $this->assign('city', $city);
        $this->assign('coun', $coun);
        return view('company/edit');
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request $request
     * @param  int $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->put();

        $data['id'] = $id;
	$data['active'] = 1;

        $company = new CompanyModel();
        $result = $company->isUpdate(true)->save($data);

        if ($result) {
            $info['status'] = 1;
            $info['msg'] = '企业信息修改成功!';
            return json($info);
        } else {
            $info['status'] = 0;
            $info['msg'] = '企业信息修改失败!';
            return json($info);
        }
    }

    /**
     * 删除指定资源
     *
     * @param  int $id
     * @return \think\Response
     */
    public function delete($id)
    {

        $company = new CompanyModel();

        $result = $company->where('id', $id)->update(['active' => 0]);

        if ($result > 0) {
            $info['status'] = 1;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的用户删除成功!';
        } else {
            $info['status'] = 0;
            $info['id'] = $id;
            $info['info'] = 'ID为: ' . $id . '的用户删除失败,请重试!';
        }
        return json($info);
    }

    public function selectInfo($upid)
    {
        $info = AddressModel::all(['upid' => $upid]);
        return json($info);
    }


}
