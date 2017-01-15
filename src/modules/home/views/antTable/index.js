import React from 'react'
import { Table, Input, Icon, Button} from 'antd'

import style from './style.less';

// const baseurl = 'http://192.168.0.10:4000/file/';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
    title: '年龄',
    dataIndex: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
  }];
const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号',
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  }, {
    key: '3',
    name: '李大嘴',
    age: 32,
    address: '西湖区湖底公园1号',
  }, {
    key: '4',
    name: '胡彦斌1',
    age: 32,
    address: '西湖区湖底公园1号-1',
  }, {
    key: '5',
    name: '胡彦祖1',
    age: 42,
    address: '西湖区湖底公园1号-1',
  }, {
    key: '6',
    name: '李大嘴1',
    age: 32,
    address: '西湖区湖底公园1号-1',
  }];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
  onChange(selectedRowKeys, selectedRows) {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll(selected, selectedRows, changeRows) {
    console.log(selected, selectedRows, changeRows);
  },
};



export default class TestAntdTable extends React.Component {

  constructor() {
    super()
  }

  render() {

    return (
      <div>
        <div style={{ fontsize: '20px', marginbottom: '20px' }}>测试ant design的Table</div>
        <Table
          className='MyTable'
          size='default'
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowClassName={(record, i) => `rowtest-${i % 2}`}
          />
      </div>
    )
  }

}
