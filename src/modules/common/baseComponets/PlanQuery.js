import { Table, Button, Input, Form, Row, Col, DatePicker, message, Select, Modal, Icon, Tabs, InputNumber, Popconfirm, notification } from 'antd';
// import './style.less';

import FormItemRangePicker from './FormItemRangePicker'
import FormItemCheckbox from './FormItemCheckbox'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option

const colLayout = {
  xs: { span: 2 },
  sm: { span: 4 },
  md: { span: 6 },
  lg: { span: 8 }
}

class PlanQuery extends Component {
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
    const plainOptions = ['编制', '审批', '下达', '执行','完成'];
    const defautOptions = ['编制', '审批', '下达', '执行','完成'];

    return (
      <div style={{ backgroundColor: '#F7F7F7' }}>
        <Form form={this.props.form}>
          <Row type="flex" justify="start" style={{ marginBottom: 8 }}>
            <Col  {...colLayout}>
              <Input placeholder="请输入计划编号或计划名称" id="planCode" onKeyDown={this.keyPress.bind(this)}  {...getFieldProps('planCode') } />
            </Col>
            <Col span='5'>
              <Button type="primary" onClick={this.search.bind(this)}><Icon type="search" />计划搜索</Button>
              <Button style={{ border: 'none' }} onClick={this.handleMore.bind(this)}>
                {this.state.more ? '更多筛选条件' : '精简筛选条件'}
                <Icon type={this.state.more ? 'caret-up' : 'caret-down'} />
              </Button>
            </Col>
            <Col span='11'>
              <FormItemCheckbox label="计划状态" id="planStatus" getFieldProps={getFieldProps} setFieldsValue={setFieldsValue}
               plainOptions={plainOptions} defaultCheckedList={defautOptions} />
            </Col>
          </Row >
        </Form>
        {
          this.state.more ?
            <Form horizontal form={this.props.form} >
              <Row type="flex" justify="space-around">
                <Col span='5'>
                  <FormItem className="notRequired-FormItem" label="计划类型" {...formItemLayout}>
                    <Select {...getFieldProps('planType') } allowClear={true}>
                      <Option key='生产计划'>生产计划</Option>
                      <Option key='外购计划'>外购计划</Option>
                      <Option key='外协计划'>外协计划</Option>
                      <Option key='综合计划'>综合计划</Option>
                      <Option key='其他计划'>其他计划</Option>
                    </Select>
                  </FormItem>
                  <FormItem className="notRequired-FormItem" label="计划编制" {...formItemLayout}>
                    <Input placeholder="请输入计划编制人" onKeyDown={this.keyPress.bind(this)} {...getFieldProps('createdByName') } />
                  </FormItem>
                </Col>
                <Col span='6'>
                  <FormItem className="notRequired-FormItem" label="订单编号" {...formItemLayout}>
                    <Input onKeyDown={this.keyPress.bind(this)} placeholder='请输入订单编号' {...getFieldProps('orderCode') } />
                  </FormItem>
                  <FormItem className="notRequired-FormItem" label="编制部门" {...formItemLayout}>
                    <Input onKeyDown={this.keyPress.bind(this)} placeholder="请输入计划编制部门" {...getFieldProps('authorDeptName') } />
                  </FormItem>
                </Col>
                <Col span='6'>
                  <FormItemRangePicker label="开始日期" id='planStartTime'
                    setFieldsValue={setFieldsValue} getFieldProps={getFieldProps} formItemLayout={formItemLayout} />
                </Col>
                <Col span='6'>
                  <FormItemRangePicker label="结束日期" id='planFinishTime' setFieldsValue={setFieldsValue}
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

PlanQuery = Form.create()(PlanQuery);

export default PlanQuery;