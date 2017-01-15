import React from 'react'
import { Upload, Input, Icon, Button,notification} from 'antd'

import style from './style.less';

const baseurl = 'http://192.168.0.10:4000/file/';

export default class UpLoad extends React.Component {

  constructor() {
    super()
    this.state = {
      fLists: [
      ]
    }
  }

 handleChange(info) {
    let fileList = info.fileList;

    //处理上传文件失败
    if(info.file.error)
    {
      notification.error({
        message: '上传文件失败【'+info.file.name+'】',
        description: info.file.response.message,
        duration: 0
      });
    }

    // 1. 上传列表数量的限制
    //    只显示最近上传的一个，旧的会被新的顶掉
    //能显示3个
    fileList = fileList.slice(-3);

    // 2. 读取远程路径并显示链接
    fileList = fileList.map((file) => {
      if (file.response&&file.response.id) {
        // 组件会将 file.url 作为链接进行展示
        file.url = baseurl+file.response.fileURL;
      }
      return file;
    });

    // 3. 按照服务器返回信息筛选成功上传的文件
    fileList = fileList.filter((file) => {
      if (file.response) {        
        return file.response.id;
      }
      return true;
    });

    this.setState({ fLists: fileList });

  }

  render() {
    const props = {
      action: 'http://192.168.0.10:4000/file/files',
      listType: 'picture',
      data: {
                createdBy: 'hlj---test',//注释掉本可以测试上传文件失败
                fileType: "图片",
            },
      onChange: this.handleChange.bind(this),
      multiple: true,
    };

    let filelist;
    if(this.state.fLists.length>0) filelist=this.state.fLists;
    else filelist=null;

    return (
      <div>
        <div>测试文件上传</div>
        <Upload {...props} fileList={filelist} className='myupload-list-inline'>
        <Button type="ghost">
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
      </div>
    )
  }

}
