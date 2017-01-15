import { Table, Button, Input, Form, Row, Col, DatePicker, message, Modal, Icon, Tabs, InputNumber, Popconfirm, notification } from 'antd';
import './style.less';

import PlanQuery from '../baseComponets/PlanQuery'
import * as customSearch from '../../../utils/publicFunction/customSearch';
import * as dateFunction from '../../../utils/publicFunction/date';
import apiRest from '../../../utils/api'

const planColumns = [ // 表格具有哪些列
  { title: '序号', dataIndex: 'index', key: 'index', width: '3%' },
  { title: '计划编号', dataIndex: 'planCode', key: 'planCode', width: '12%', sorter: true },
  { title: '计划名称', dataIndex: 'planName', key: 'planName', width: '8%', sorter: true },
  {
    title: '计划类型', dataIndex: 'planType', key: 'planType', width: '8%', sorter: true,
    render: (planType) => {
      switch (planType) {
        case '0':
          return (<span>生产计划</span>)
        case '1':
          return (<span>外购计划</span>)
        case '2':
          return (<span>外协计划</span>)
        case '3':
          return (<span>综合计划</span>)
        case '4':
          return (<span>其他计划</span>)
        default:
          return (<span>生产计划</span>)
      }
    }
  },
  { title: '指令号', dataIndex: 'commandNo', key: 'commandNo', sorter: true, width: '8%' },
  { title: '开始日期', dataIndex: 'planStartTime', key: 'planStartTime', sorter: true, width: '7%' },
  { title: '完成日期', dataIndex: 'planFinishTime', key: 'planFinishTime', sorter: true, width: '7%' },
  { title: '编制人', dataIndex: 'createdByName', key: 'createdByName', sorter: true, width: '4%' },
  { title: '编制日期', dataIndex: 'createdAt', key: 'createdAt', sorter: true, width: '7%' },
  { title: '备注', dataIndex: 'remark', key: 'remark', sorter: true, width: '7%' },
  {
    title: '状态', dataIndex: 'planStatus', key: 'planStatus', width: '6%',
    render: (planStatus, plan) => {
      switch (planStatus) {
        case '0':
          return <span style={{ color: '#666666' }}>编制中</span>;
        case '-1':
          return <span style={{ color: '#666666' }}>编制中</span>;
        case '1':
          return <span style={{ color: '#666666' }}>审批中</span>;
        case '2':
          switch (plan.pauseStop) {
            case '1':
              return <span style={{ color: '#2DB7F5' }}>已下达(暂停) </span>;
            case '2':
              return <span style={{ color: '#2DB7F5' }}>已下达(终止) </span>;
            default:
              return <span style={{ color: '#2DB7F5' }}>已下达</span>;
          }
        case '3':
          return <span style={{ color: '#3300CC' }}>执行中</span>;
        case '4':
          return <span style={{ color: '#006600' }}>已完成</span>;
      }
    }
  }
]

export default class PlanitemSelect extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,

      planpage: 1,
      planpageSize: 5,
      totalplans: 0,
      plans: [],
      loadingPlan: false,

      planitems: [],
      loadingPlanitem: false,

      selectedPlan: null,

      selectedItemRowKeys: [],
      selectedItemRows: [],

      orderCode: '',//关联的订单号
      customSql: {
        query: '1=1',
        sorts: []
      }
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(newProps) {
    const self = this;
  }

  //加载数据
  getPlans(page, pageSize, cSql, oCode) {
    this.setState({ loadingPlan: true });
    let customSql = cSql || this.state.customSql;
    let orderCode = oCode || this.state.oCode;

    apiRest.put("/planmng/plans", {
      params: {
        page: page,
        pageSize: pageSize,
        orderCode: orderCode
      },
      data: customSql
    }).then((body) => {
      console.log(body)
      let planlist = body.body.detail;
      let i = (parseInt(page) - 1) * parseInt(pageSize) + 1;
      planlist.forEach((plan) => {
        plan.index = i++;
        plan.createdAt = dateFunction.dateFormatCon(plan.createdAt)
        if (plan.planStartTime) {
          plan.planStartTime = dateFunction.dateFormatCon(plan.planStartTime) // 计划开始时间处理
        }
        if (plan.planFinishTime) {
          plan.planFinishTime = dateFunction.dateFormatCon(plan.planFinishTime) //  计划结束时间处理
        }
      })

      this.setState({
        plans: planlist,
        totalplans: body.body.totalElements,

        customSql: customSql,
        orderCode: orderCode,

        planpage: page,
        planpageSize: pageSize,

        planitems: [],
        selectedPlan: null,
        selectedItemRowKeys: [],
        selectedItemRows: [],

        loadingPlan: false
      });
    }, (error) => {
      notification.error({
        message: '获取计划信息失败',
        description: error.message,
      });
    })
  }

  //根据计划id得到计划项
  getPlanitem(plan) {
    if (this.state.selectedPlan && this.state.selectedPlan.id == plan.id)
      return;
    this.setState({
      loadingPlanitem: true,
      selectedPlan: plan,
    });
    apiRest.get("/planmng/plans/" + plan.id, {
    }).then((body) => {
      console.log(body)
      let planitemlist = body.body.planItems;
      let i = 1;
      planitemlist.forEach((item) => {
        item.index = i++;
        item.createdAt = dateFunction.dateFormatCon(item.createdAt)
        if (item.planStartTime) {
          item.planStartTime = dateFunction.dateFormatCon(item.planStartTime) // 计划开始时间处理
        }
        if (item.planFinishTime) {
          item.planFinishTime = dateFunction.dateFormatCon(item.planFinishTime) //  计划结束时间处理
        }
      })
      console.log('planitemlist', planitemlist)

      this.setState({
        planitems: planitemlist,
        loadingPlanitem: false,
        selectedItemRows: [],
        selectedItemRowKeys: []
      });
    }, (error) => {
      notification.error({
        message: '获取计划项信息失败',
        description: error.message,
      });
    })
  }
  //分页、排序、筛选变化时触发
  tableChange(pagination, filters, sorter) {
    let page = pagination.current;
    let pageSize = pagination.pageSize;
    let customSql = this.state.customSql;

    if (sorter.hasOwnProperty('field')) {//是否排序
      let order = sorter.order === "ascend" ? "ASC" : "DESC";
      let sort = customSearch.sorter(sorter.column.key, 'STRING', order);
      let sorts = new Array();
      sorts.push(sort);
      customSql.sorts = sorts;
    }
    this.getPlans(page, pageSize, customSql);

  }

  showModal() {
    this.setState({ modalShow: true })
    this.getPlans(this.state.planpage, this.state.planpageSize);
  }

  handleSelected() {
    //获取选中的物料明细，通过回调函数返回
    let itemlist = this.state.selectedItemRows;
    if (itemlist.length <= 0) {
      Modal.warning({
        title: '提示',
        content: '请选中计划项！',
      });
      return;
    }
    this.props.addTableData && this.props.addTableData(itemlist);
    this.hideModal();
  }

  hideModal() {
    this.setState({ modalShow: false })
  }

  showTotal(total) { // 显示有多少条计划
    return `共${total}条`
  }

  //处理行点击事件
  onRowClickPlan(record, index) {
    this.getPlanitem(record);
  }

  //处理选中对象
  onSelectItem(record) {
    // console.log('record', record);
    let itemlist = new Array();
    itemlist.push(record);

    this.props.addTableData && this.props.addTableData(itemlist);
    this.hideModal();
  }

  setRowName(record, i) {
    let selectedPlan = this.state.selectedPlan;
    if (selectedPlan && selectedPlan.id == record.id)
      return 'tableRow-select';

    return `tableRow-${i % 2}`;
  }

  //根据查询条件查询
  queryByCond(searchCond) {
    console.log(searchCond)
    let newcustomSql = {};
    let orderCode = ''
    let newQuery = '1=1'
    if (searchCond.planCode) { // 计划编号或计划名称
      newQuery += ' ' + customSearch.searchSql('and(', 'planCode', 'like', searchCond.planCode.trim(), false)
      newQuery += ' ' + customSearch.searchSql('or', 'planName', 'like', searchCond.planCode.trim(), false) + ')'
    }
    if (searchCond.planType) { // 计划类型
      let planType = '0';
      switch (searchCond.planType) {
        case '生产计划':
          planType = '0'
          break
        case '外购计划':
          planType = '1'
          break
        case '外协计划':
          planType = '2'
          break
        case '综合计划':
          planType = '3'
          break
        case '其他计划':
          planType = '4'
          break
        default:
          planType = '0'
      }
      newQuery += ' ' + customSearch.searchSql('and', 'planType', 'like', planType, false)
    }
    if (searchCond.orderCode) { // 订单编号
      orderCode = searchCond.orderCode.trim()
    }
    if (searchCond.createdByName) { // 计划编制人
      newQuery += ' ' + customSearch.searchSql('and', 'createdByName', 'like', searchCond.createdByName.trim(), false)
    }
    if (searchCond.authorDeptName) { // 计划编制部门
      newQuery += ' ' + customSearch.searchSql('and', 'authorDeptName', 'like', searchCond.authorDeptName.trim(), false)
    }
    if (searchCond.planStartTime && searchCond.planStartTime[0]) { // 计划开始日期
      newQuery += ' ' + customSearch.searchSql('and', 'planStartTime', '>=', dateFunction.dateFormatCon(searchCond.planStartTime[0]) + ' 00:00:00', false)
      newQuery += ' ' + customSearch.searchSql('and', 'planStartTime', '<=', dateFunction.dateFormatCon(searchCond.planStartTime[1]) + ' 23:59:59', false)
    }
    if (searchCond.planFinishTime && searchCond.planFinishTime[0]) { // 计划结束日期
      newQuery += ' ' + customSearch.searchSql('and', 'planFinishTime', '>=', dateFunction.dateFormatCon(searchCond.planFinishTime[0]) + ' 00:00:00', false)
      newQuery += ' ' + customSearch.searchSql('and', 'planFinishTime', '<=', dateFunction.dateFormatCon(searchCond.planFinishTime[1]) + ' 23:59:59', false)
    }
    if (searchCond.planStatus && searchCond.planStatus[0]) {
      let values = '(' + searchCond.planStatus.join(',') + ')';
      values = values.replace('编制', '0,-1');
      values = values.replace('审批', '1');
      values = values.replace('下达', '2');
      values = values.replace('执行', '3');
      values = values.replace('完成', '4');

      newQuery += ' ' + customSearch.searchSql('and', 'planStatus', 'in', values, true);
    }

    newcustomSql.query = newQuery;
    newcustomSql.sorts = this.state.customSql.sorts;
    this.getPlans(1, this.state.planpageSize, newcustomSql, orderCode);
  }

  render() {
    let width = this.props.width || '1200';
    let buttonName = this.props.buttonName || '添加';
    let icon = this.props.buttonIcon || 'plus-circle-o';
    let title = this.props.modalTitle || "从计划项中添加物料";
    let maskClosable = this.props.maskClosable || false;

    const pagination = { // 分页
      total: this.state.totalplans,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '20', '30'],
      showQuickJumper: true,
      defaultCurrent: this.state.planpage,
      current: this.state.planpage,
      pageSize: this.state.planpageSize,
      showTotal: this.showTotal.bind(this, this.state.totalplans)
    };

    const columnsItem = [
      { title: '序号', dataIndex: 'index', key: 'index', width: '3%' },
      { title: '计划类型', dataIndex: 'planItemType1', key: 'planItemType1', width: '5%', },
      { title: '物料编码', dataIndex: 'partCode', key: 'partCode', width: '8%' },
      { title: '物料名称', dataIndex: 'partName', key: 'partName', width: '10%' },
      { title: '版本', dataIndex: 'partVersion', key: 'partVersion', width: '5%' },
      { title: '规格', dataIndex: 'partSpec', key: 'partSpec', width: '5%' },
      {
        title: '关联订单', dataIndex: 'orderIdCodes', key: 'orderIdCodes', width: '15%',
        render: (orderIdCodes) => {
          if (orderIdCodes.length > 0) {
            return orderIdCodes.map((orderIdCode) => {
              return <p>{orderIdCode.orderCode}<br /></p>
            })
          }
        }
      },
      { title: '数量', dataIndex: 'num', key: 'num', width: '6%', },
      { title: '单位', dataIndex: 'numUnit', key: 'numUnit', width: '6%', },
      { title: '重量', dataIndex: 'weight', key: 'weight', width: '5%', },
      { title: '单位', dataIndex: 'weightUnit', key: 'weightUnit', width: '5%' },
      { title: '计划开始', dataIndex: 'planStartTime', key: 'planStartTime', width: '8%', },
      { title: '计划完成', dataIndex: 'planFinishTime', key: 'planFinishTime', width: '8%', },
      { title: '主制车间', dataIndex: 'mainWorkShop', key: 'mainWorkShop', width: '8%', },
      { title: '备注', dataIndex: 'remark', key: 'remark', width: '6%', },
      {
        title: '操作', dataIndex: 'operation', key: 'operation', width: 40, fixed: 'right',
        render: (text, record, index) => {
          return (
            <a onClick={this.onSelectItem.bind(this, record)}>选中</a>
          )
        }
      }
    ];

    const rowSelectionItem = {
      selectedRowKeys: this.state.selectedItemRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState(
          {
            selectedItemRowKeys: selectedRowKeys,
            selectedItemRows: selectedRows,
          }
        )
      },
    };

    let selectedPlan = this.state.selectedPlan;

    return (<div>
      <Button type="primary" icon={icon} onClick={this.showModal.bind(this)}>{buttonName}</Button>
      <Modal title={title} width={width}
        visible={this.state.modalShow}
        onOk={this.handleSelected.bind(this)}
        onCancel={this.hideModal.bind(this)}
        maskClosable={maskClosable}>
        <PlanQuery queryByCond={this.queryByCond.bind(this)} />
        <hr />
        <Table className="order-table" columns={planColumns} size='small'
          pagination={pagination}
          dataSource={this.state.plans}
          // rowSelection={rowSelection}
          loading={this.state.loadingPlan}
          onChange={this.tableChange.bind(this)}
          rowClassName={this.setRowName.bind(this)}
          rowKey={record => record.id}
          onRowClick={this.onRowClickPlan.bind(this)}
          />
        <div>
          选中计划：{selectedPlan ? selectedPlan.planCode + '  ' + (selectedPlan.planName ? selectedPlan.planName : '')
            : '未选择计划'}
          <span style={{ marginLeft: '20px' }}>计划项：{this.state.planitems.length}项</span>
        </div>
        <hr />
        <Table className="orderbill-table" columns={columnsItem} size='small'
          dataSource={this.state.planitems}
          pagination={false}
          rowSelection={rowSelectionItem}
          rowKey={record => record.id}
          scroll={{ x: 1300 }}
          />
      </Modal>
    </div>)
  }
}