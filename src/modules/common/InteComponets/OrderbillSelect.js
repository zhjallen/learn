import { Table, Button, Input, Form, Row, Col, DatePicker, message, Modal, Icon, Tabs, InputNumber, Popconfirm, notification } from 'antd';
import './style.less';

import OrderQuery from '../baseComponets/OrderQuery'
import * as customSearch from '../../../utils/publicFunction/customSearch';
import * as dateFunction from '../../../utils/publicFunction/date';
import apiRest from '../../../utils/api'

const columnsOrder = [
  { title: '序号', dataIndex: 'index', key: 'index', width: '2%', },
  { title: '订单编号', dataIndex: 'orderCode', key: 'orderCode', width: '15%', sorter: true },
  { title: '订单名称', dataIndex: 'orderName', key: 'orderName', width: '8%', sorter: true },
  { title: '客户', dataIndex: 'clientFullName', key: 'clientFullName', width: '15%', sorter: true },
  { title: '销售', dataIndex: 'orderMakerName', key: 'orderMakerName', sorter: true, width: '5%' },
  { title: '合计(元）', dataIndex: 'price', key: 'price', sorter: true, className: 'column-price', width: '7%' },
  { title: '订单金额(元)', dataIndex: 'turnOver', key: 'turnOver', sorter: true, className: 'column-price', width: '7%' },
  { title: '交付日期', dataIndex: 'deliveryDate', key: 'deliveryDate', sorter: true, width: '7%', },
  { title: '状态', dataIndex: 'newStatus', key: 'newStatus ', width: '4%' }
];

export default class OrderbillSelect extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,

      orderpage: 1,
      orderpageSize: 5,
      totalorders: 0,
      orders: [],
      loadingOrder: false,

      orderbills: [],
      loadingorderbill: false,

      selectedOrder: null,

      selectedBillRowKeys: [],
      selectedBillRows: [],

      querysAndSorts: {
        querys: [
        ],
        sort: {
          name: 'createdAt',
          sort: 'desc'
        }
      },

    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(newProps) {
    const self = this;
  }
  //加载数据
  getOrders(page, pageSize, querysAndSorts) {
    this.setState({ loadingOrder: true });
    let querys = querysAndSorts || this.state.querysAndSorts;

    apiRest.put("/order/orders", {
      params: {
        page: page,
        pageSize: pageSize
      },
      data: querys
    }).then((body) => {
      // console.log(body)
      let orderlist = body.body.orderInfo;
      let i = (parseInt(page) - 1) * parseInt(pageSize) + 1;
      orderlist.forEach((order) => {
        order.index = i++;
        switch (order.orderStatus) {
          case "1":
            order.newStatus = "未提交";
            break;
          case "2":
            order.newStatus = "审核中"
            break;
          case "3":
            order.newStatus = "执行中"
            break;
          case "4":
            order.newStatus = "已结单"
            break;
          case "9":
            order.newStatus = "未提交"
            break;
          default:
            break;
        }
      })
      this.setState({
        orders: orderlist,
        totalorders: body.body.totalElements,
        querysAndSorts: querys,
        orderpage: page,
        orderpageSize: pageSize,

        orderbills: [],
        selectedOrder: null,
        selectedBillRowKeys: [],
        selectedBillRows: [],

        loadingOrder: false
      });
    }, (error) => {
      notification.error({
        message: '获取订单信息失败',
        description: error.message,
      });
    })
  }

  getOrderbill(order) {
    if (this.state.selectedOrder && this.state.selectedOrder.id == order.id)
      return;
    this.setState({
      loadingorderbill: true,
      selectedOrder: order,
    });
    apiRest.get("/order/orderitems/" + order.id, {
    }).then((body) => {
      console.log(body)
      let orderbilllist = body.body;
      let i = 1;
      orderbilllist.forEach((bill) => {
        bill.index = i++;
        bill.partCode = bill.goodCode;
        bill.partName = bill.itemName;
        bill.partSpec = bill.itemSpec;
        bill.version = bill.itemVersion;
      })

      this.setState({
        orderbills: orderbilllist,
        loadingorderbill: false,
        selectedBillRows: [],
        selectedBillRowKeys: []
      });
    }, (error) => {
      notification.error({
        message: '获取订单明细信息失败',
        description: error.message,
      });
    })
  }

  //分页、排序、筛选变化时触发
  tableChange(pagination, filters, sorter) {
    let page = pagination.current;
    let pageSize = pagination.pageSize;
    let newquerysAndSorts = this.state.querysAndSorts;

    if (sorter.hasOwnProperty('field')) {//是否排序
      let sort = {
        name: sorter.field,
        sort: sorter.order === "ascend" ? "asc" : "desc"
      }
      newquerysAndSorts.sort = sort;
    }
    this.getOrders(page, pageSize, newquerysAndSorts);

  }

  showModal() {
    this.setState({ modalShow: true })
    this.getOrders(this.state.orderpage, this.state.orderpageSize);
  }

  //根据查询条件查询
  queryByCond(condItem) {
    console.log(condItem)
    //形成查询语句
    let queryOr = new Array();
    let querys = new Array();
    let newquerysAndSorts = {}

    if (condItem.orderCode) {
      let orderCode = customSearch.getSearchCon('orderCode', 'and', 'like', condItem.orderCode.trim())
      let clientFullName = customSearch.getSearchCon('clientFullName', 'or', 'like', condItem.orderCode.trim())
      queryOr.push(orderCode, clientFullName);
      querys.push(queryOr);
    }
    if (condItem.itemName) {
      let itemName = customSearch.getSearchCon('itemName', 'and', 'like', condItem.itemName.trim())
      querys.push(itemName)
    }
    if (condItem.orderMakerName) {
      let orderMakerName = customSearch.getSearchCon('orderMakerName', 'and', 'like', condItem.orderMakerName.trim())
      querys.push(orderMakerName)
    }
    if (condItem.createdByName) {
      let createdByName = customSearch.getSearchCon('createdByName', 'and', 'like', condItem.createdByName.trim())
      querys.push(createdByName)
    }
    if (condItem.deliveryDate && condItem.deliveryDate[0]) {
      let deliveryDate1 = customSearch.getSearchCon('deliveryDate', 'and', '>=', dateFunction.dateFormatCon(condItem.deliveryDate[0]) + ' 00:00:00');
      let deliveryDate2 = customSearch.getSearchCon('deliveryDate', 'and', '<=', dateFunction.dateFormatCon(condItem.deliveryDate[1]) + ' 23:59:59');
      querys.push(deliveryDate1, deliveryDate2)
    }
    if (condItem.createdAt && condItem.createdAt[0]) {
      let createdAt1 = customSearch.getSearchCon('createdAt', 'and', '>=', dateFunction.dateFormatCon(condItem.createdAt[0]) + ' 00:00:00');
      let createdAt2 = customSearch.getSearchCon('createdAt', 'and', '<=', dateFunction.dateFormatCon(condItem.createdAt[1]) + ' 23:59:59');
      querys.push(createdAt1, createdAt2);
    }
    if (condItem.minPrice) {//订单金额最小值
      let minPrice = customSearch.getSearchCon('price', 'and', '>=', condItem.minPrice)
      querys.push(minPrice);
    }
    if (condItem.maxPrice) {//订单金额最大值
      let maxPrice = customSearch.getSearchCon('price', 'and', '<=', condItem.maxPrice)
      querys.push(maxPrice);
    }
    if (condItem.orderStatus && condItem.orderStatus[0]) {
      let sno = 1;
      let statusEdit = new Array;
      condItem.orderStatus.forEach((status) => {
        let statusCon = '';        
        let andor = 'and';
        if (sno > 1)
          andor = 'or';
        sno++;
        switch (status) {
          case "未提交":
            statusCon = customSearch.getSearchCon('orderStatus', andor, '=', '1');
            statusEdit.push(statusCon);
            andor = 'or';
            statusCon = customSearch.getSearchCon('orderStatus', andor, '=', '9');
            statusEdit.push(statusCon);
            break;
          case "审核中":
            statusCon = customSearch.getSearchCon('orderStatus', andor, '=', '2');
            statusEdit.push(statusCon);
            break;
          case "执行中":
            statusCon = customSearch.getSearchCon('orderStatus', andor, '=', '3');
            statusEdit.push(statusCon);
            break;
          case "已结单":
            statusCon = customSearch.getSearchCon('orderStatus', andor, '=', '4');
            statusEdit.push(statusCon);
            break;
          default:
            break;
        }        
      })
      querys.push(statusEdit);
    }
    newquerysAndSorts.querys = querys;
    newquerysAndSorts.sort = this.state.querysAndSorts.sort;
    this.getOrders(1, this.state.orderpageSize, newquerysAndSorts);
  }

  handleSelected() {
    //获取选中的物料明细，通过回调函数返回
    let itemlist = this.state.selectedBillRows;
    if (itemlist.length <= 0) {
      Modal.warning({
        title: '提示',
        content: '请选中订单明细！',
      });
      return;
    }
    this.props.addTableData && this.props.addTableData(itemlist);
    this.hideModal();
  }

  hideModal() {
    this.setState({ modalShow: false })
  }
  showTotal(total) { // 显示有多少条订单
    return `共${total}条`
  }

  //处理行点击事件
  onRowClickOrder(record, index) {
    // console.log('record',record)
    // console.log('index',index)
    this.getOrderbill(record);
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
    let selectedOrder = this.state.selectedOrder;
    if (selectedOrder && selectedOrder.id == record.id)
      return 'tableRow-select';

    return `tableRow-${i % 2}`;
  }

  render() {
    let self = this;
    let width = this.props.width || '1200';
    let buttonName = this.props.buttonName || '添加';
    let icon = this.props.buttonIcon || 'plus-circle-o';
    let title = this.props.modalTitle || "从订单明细中添加物料";
    let maskClosable = this.props.maskClosable || false;
    let pagination = {//分页
      total: this.state.totalorders,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '20', '30'],
      showQuickJumper: true,
      defaultCurrent: this.state.orderpage,
      current: this.state.orderpage,
      pageSize: this.state.orderpageSize,
      showTotal: this.showTotal.bind(this, this.state.totalorders)
    };
    const columnsBill = [
      { title: '序号', dataIndex: 'index', key: 'index', width: 60, fixed: 'left' },
      { title: '编码', dataIndex: 'partCode', key: 'partCode', width: 120, sorter: true, fixed: 'left' },
      { title: '名称', dataIndex: 'partName', key: 'partName', width: 100, sorter: true, fixed: 'left' },
      { title: '规格', dataIndex: 'partSpec', key: 'partSpec', width: 150, sorter: true, fixed: 'left' },
      { title: '版本', dataIndex: 'version', key: 'version', width: 60, fixed: 'left' },
      { title: '数量', dataIndex: 'itemNum', key: 'itemNum', width: 60 },
      { title: '单位', dataIndex: 'unit', key: 'unit', width: 40 },
      { title: '重量', dataIndex: 'weight', key: 'weight', width: 60 },
      { title: '单位', dataIndex: 'weightUnit', key: 'weightUnit', width: 40 },
      {
        title: '单价', dataIndex: 'goodPrice', key: 'goodPrice', width: 100,
        render: (goodPrice, record) => {
          if (record.valuationType === '0') { // 按数量计价
            return (
              <span>{goodPrice}/{record.unit}</span>
            )
          }
          if (record.valuationType === '1') { // 按重量计价
            return (
              <span>{goodPrice}/{record.weightUnit}</span>
            )
          }
        }
      },
      { title: '折扣(%)', dataIndex: 'discount', key: 'discount', width: 80 },
      { title: '小计', dataIndex: 'subPrice', key: 'subPrice', width: 80 },
      { title: '交货日期', dataIndex: 'deliveryDate', key: 'deliveryDate', width: 100 },
      { title: '备注', dataIndex: 'remark', key: 'remark' },
      {
        title: '操作', dataIndex: 'operation', key: 'operation', width: 40, fixed: 'right',
        render: (text, record, index) => {
          return (
            <a onClick={this.onSelectItem.bind(this, record)}>选中</a>
          )
        }
      }
    ]

    const rowSelectionBill = {
      selectedRowKeys: self.state.selectedBillRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        self.setState(
          {
            selectedBillRowKeys: selectedRowKeys,
            selectedBillRows: selectedRows,
          }
        )
      },
    };

    let selectedOrder = this.state.selectedOrder;
    return (
      <div>
        <Button type="primary" icon={icon} onClick={this.showModal.bind(this)}>{buttonName}</Button>
        <Modal title={title} width={width}
          visible={this.state.modalShow}
          onOk={this.handleSelected.bind(this)}
          onCancel={this.hideModal.bind(this)}
          maskClosable={maskClosable}>
          <OrderQuery queryByCond={this.queryByCond.bind(this)} />
          <hr />
          <Table className="order-table" columns={columnsOrder} size='small'
            pagination={pagination}
            dataSource={this.state.orders}
            // rowSelection={rowSelection}
            loading={this.state.loadingOrder}
            onChange={this.tableChange.bind(this)}
            rowClassName={this.setRowName.bind(this)}
            rowKey={record => record.id}
            onRowClick={this.onRowClickOrder.bind(this)}
            />
          <div>
            选中订单：{selectedOrder ? selectedOrder.orderCode + '  ' + selectedOrder.orderName
              : '未选择订单'}
            <span style={{ marginLeft: '20px' }}>订单明细：{this.state.orderbills.length}项</span>
          </div>
          <hr />
          <Table className="orderbill-table" columns={columnsBill} size='small'
            dataSource={this.state.orderbills}
            pagination={false}
            rowSelection={rowSelectionBill}
            rowKey={record => record.id}
            scroll={{ x: 1300 }}
            />
        </Modal>
      </div>
    )
  }
}