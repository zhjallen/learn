import { Table, Button, Input, Form, Row, Col, DatePicker, message, Modal, Icon, Tabs, InputNumber, Popconfirm, notification } from 'antd';
// import './style.less';

import FormItemRangePicker from './FormItemRangePicker'
import FormItemCheckbox from './FormItemCheckbox'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const colLayout = {
  xs: { span: 2 },
  sm: { span: 4 },
  md: { span: 6 },
  lg: { span: 8 }
}

class OrderQuery extends Component {
  constructor() {
    super();
    this.state = {
      more: false,
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(newProps) {
    const self = this;
  }

  //键盘事件
  keyPress(e) {
    if (e.keyCode === 13) {
      this.search(e)
    }
  }
  //是否显示更多筛选条件
  handleMore(e) {
    this.setState({
      more: !this.state.more
    })
  }

  //订单搜索
  search(e) {
    e.preventDefault();
    let values = this.props.form.getFieldsValue();
    // console.log('收到表单值：', this.props.form.getFieldsValue());
    this.props.queryByCond && this.props.queryByCond(values);
  }

  render() {
    const { getFieldProps, getFieldValue, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    const plainOptions = ['未提交', '审核中', '执行中', '已结单'];
    const defautOptions = ['未提交', '审核中','执行中', '已结单'];

    return (
      <div style={{ backgroundColor: '#F7F7F7' }}>
        <Form form={this.props.form}>
          <Row type="flex" justify="start" style={{ marginBottom: 8 }}>
            <Col  {...colLayout}>
              <Input placeholder="请输入订单编号或客户名称" id="orderCode" onKeyDown={this.keyPress.bind(this)}  {...getFieldProps('orderCode') } />
            </Col>
            <Col span='5'>
              <Button type="primary" onClick={this.search.bind(this)}><Icon type="search" />订单搜索</Button>
              <Button style={{ border: 'none' }} onClick={this.handleMore.bind(this)}>
                {this.state.more ? '更多筛选条件' : '精简筛选条件'}
                <Icon type={this.state.more ? 'caret-up' : 'caret-down'} />
              </Button>
            </Col>
            <Col span='11'>
              <FormItemCheckbox label="订单状态" id="orderStatus" getFieldProps={getFieldProps} setFieldsValue={setFieldsValue}
               plainOptions={plainOptions} defaultCheckedList={defautOptions} />
            </Col>
          </Row >
        </Form>
        {
          this.state.more ?
            <Form horizontal form={this.props.form} >
              <Row type="flex" justify="space-around">
                <Col span='6'>
                  <FormItem className="notRequired-FormItem" label="物料名称" {...formItemLayout}>
                    <Input placeholder="请输入产品名称" id="itemName" onKeyDown={this.keyPress.bind(this)} {...getFieldProps('itemName') } />
                  </FormItem>
                  <FormItem className="notRequired-FormItem" label="订单金额" labelCol={{ span: 6 }} >
                    <Col span='6'>
                      <FormItem className="notRequired-FormItem">
                        <Input onKeyDown={this.keyPress.bind(this)} type="number" placeholder="请输入金额" min={0} id="minPrice"  {...getFieldProps('minPrice') } />
                      </FormItem>
                    </Col>
                    <Col span='1'>
                      <p className="ant-form-split">--</p>
                    </Col>
                    <Col span='6'>
                      <FormItem className="notRequired-FormItem">
                        <Input placeholder="请输入金额" onKeyDown={this.keyPress.bind(this)} type="number" min={0} id="maxPrice"  {...getFieldProps('maxPrice') } />
                      </FormItem>
                    </Col>
                  </FormItem>
                </Col>
                <Col span='4'>
                  <FormItem className="notRequired-FormItem" label="销售" {...formItemLayout}>
                    <Input placeholder="请输入销售人员" id="orderMakerName" onKeyDown={this.keyPress.bind(this)} {...getFieldProps('orderMakerName') } />
                  </FormItem>
                  <FormItem className="notRequired-FormItem" label="创建人" {...formItemLayout}>
                    <Input placeholder="请输入创建人员" id="createdByName" onKeyDown={this.keyPress.bind(this)} {...getFieldProps('createdByName') } />
                  </FormItem>
                </Col>
                <Col span='7'>
                  <FormItemRangePicker label="交付日期" id='deliveryDate'
                    setFieldsValue={setFieldsValue} getFieldProps={getFieldProps} formItemLayout={formItemLayout} />
                </Col>
                <Col span='7'>
                  <FormItemRangePicker label="创建日期" id='createdAt' setFieldsValue={setFieldsValue}
                    getFieldProps={getFieldProps} formItemLayout={formItemLayout} />
                </Col>
              </Row>
            </Form>
            : ''
        }
      </div>
    )
  }
}

OrderQuery = Form.create()(OrderQuery);

export default OrderQuery;