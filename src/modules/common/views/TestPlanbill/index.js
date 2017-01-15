//引入样式表
import style from './style.less';
import { Table } from 'antd';

import PlanitemSelect from '../../InteComponets/PlanitemSelect'

//PlanitemSelect 支持属性：
//width，Modal的宽度，默认1200
//maskClosable
//buttonName，按钮的名字
//buttonIcon，按钮的图标
//modalTitle，Modal的Title名
//addTableData，回调函数，返回选中的物料数组，可在该回调函数中把返回的数据进行处理添加到指定的组件中，参考例子

const columns = [
  { title: '物料名称', dataIndex: 'partName', key: 'partName' },
  { title: '物料编码', dataIndex: 'partCode', key: 'partCode' },
  { title: '规格', dataIndex: 'partSpec', key: 'partSpec' },
  { title: '类型', dataIndex: 'matType', key: 'matType', },
  { title: '图号', dataIndex: 'partNo', key: 'partNo' },
  { title: '版本', dataIndex: 'version', key: 'version' },
  { title: '材质', dataIndex: 'material', key: 'material' },
  { title: '备注', dataIndex: 'remark', key: 'remark' }
];

export default class TestPlanbill extends Component {
  constructor(props) {
    super();
    this.state = {
      dataSource: []
    }
  }

  addTableData(itemlist) {
    //在这里可以把对象处理为需要的对象
    let dataS = this.state.dataSource;
    itemlist.forEach((item) => {
      let newItem = {};
      newItem.partName = item.partName;
      newItem.partCode = item.partCode;
      newItem.partSpec = item.partSpec;
      newItem.version = item.version || item.partVersion;
      dataS.push(newItem);
    })
    this.setState({
      dataSource: dataS,
    })
  }

  render() {
    return (
      <div className="home-container code-box">
        <Table columns={columns}
          dataSource={this.state.dataSource}
          />
        <hr />
        <PlanitemSelect width='1200' addTableData={this.addTableData.bind(this)} maskClosable buttonName='从计划项中添加'/>
      </div>
    );
  }
}


