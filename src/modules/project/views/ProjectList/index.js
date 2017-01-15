//引入样式表
import style from './style.less';
import { Button, Alert, Table } from 'antd'

import constant from '../../'

@connect(
  state => state[constant.NAME],   //会把此模块下的所有reducer对于的状态值引入
  dispatch => bindActionCreators({}, dispatch)
)

export default class Layout extends Component {
  constructor(props) {
    super();
  }



  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
  }

  render() {
    /*
    const columns = [{
      title: '编号',
      dataIndex: 'name',
    }, {
        title: '名称',
        dataIndex: 'age',
        sorter: true,
      }, {
        title: '地址',
        dataIndex: 'address',
        filters: [
          { text: '华东区域', value: '华东' },
          { text: '华北区域', value: '华北' },
          { text: '华南区域', value: '华南' },
          { text: '华中区域', value: '华中' },
        ]
      }, {
        title: '负责人',
        dataIndex: 'owner',
      }];*/
      const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  width: '40%',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  width: '30%',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
  width: '30%',
}];

const data = [{
  key: 1,
  name: 'a',
  age: 32,
  address: '我是a',
  children: [{
    key: 11,
    name: 'aa',
    age: 33,
    address: '我是aa',
  }, {
    key: 12,
    name: 'ab',
    age: 33,
    address: '我是ab',
    children: [{
      key: 121,
      name: 'aba',
      age: 33,
      address: '我是aba',
    }],
  }, {
    key: 13,
    name: 'ac',
    age: 33,
    address: '我是ac',
    children: [{
      key: 131,
      name: 'aca',
      age: 33,
      address: '我是aca',
      children: [{
        key: 1311,
        name: 'acaa',
        age: 33,
        address: '我是acaa',
      }, {
        key: 1312,
        name: 'acab',
        age: 33,
        address: '我是acab',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'b',
  age: 32,
  address: '我是b',
}];
    return (
      <div className="project-list-container">
        <div style={{ marginTop: '6px', marginBottom: '10px' }}>
          <Link to={this.props.location.pathname + '/new'}>
            <Button type="primary" icon="file" style={{ marginRight: "10px" }}>
              新建项目
            </Button>
          </Link>
          <Link to={this.props.location.pathname + '/edit/:id'}>
            <Button type="default" icon="edit" style={{ marginRight: "10px" }}>编辑</Button>
          </Link>
          <Button type="default" icon="delete" style={{ marginRight: "10px" }}>删除</Button>
        </div>
        <Table columns={columns}
        dataSource={data}
        expandedRowKeys={[1,12,13]}
          onChange={this.handleTableChange} />
      </div>
    );
  }
}