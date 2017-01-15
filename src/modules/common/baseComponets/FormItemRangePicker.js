import React from 'react';
import { Form, Select, Input, Button, Icon, DatePicker, TimePicker, Radio, Switch, Cascader, Col, Row } from 'antd';
import * as dateFunction from '../../../utils/publicFunction/date';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button

export default class FormItemRangePicker extends Component {
  constructor() {
    super();
    this.state = {
      selectDate: [],
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(newProps) {
    const self = this;
  }
  //获取交货日期单选框值
  getRadioValue(e) {
    let dateArr = new Array();//创建一个订单交货期数组
    let now = new Date();
    const id = this.props.id;
    switch (e.target.value) {
      case 'deliveryWeek':
        dateArr.splice(0, dateArr.length);
        dateArr.push(dateFunction.dateFormatCon(dateFunction.getWeekStartDate()), dateFunction.dateFormatCon(now));
        this.props.setFieldsValue({ [id]: dateArr });
        break;
      case 'deliveryMonth':
        dateArr.splice(0, dateArr.length);
        dateArr.push(dateFunction.dateFormatCon(dateFunction.getMonthStartDate()), dateFunction.dateFormatCon(now));
        this.props.setFieldsValue({ [id]: dateArr });
        break;
      case 'deliveryQuarter':
        dateArr.splice(0, dateArr.length);
        dateArr.push(dateFunction.dateFormatCon(dateFunction.getQuarterStartDate()), dateFunction.dateFormatCon(now));
        this.props.setFieldsValue({ [id]: dateArr });
        break;
      case 'deliveryYear':
        dateArr.splice(0, dateArr.length);
        dateArr.push(dateFunction.dateFormatCon(dateFunction.getYearFirstDate()), dateFunction.dateFormatCon(now))
        this.props.setFieldsValue({ [id]: dateArr });
        break;
      default: {
        dateArr.splice(0, dateArr.length)//清空数组
        this.props.setFieldsValue({ [id]: dateArr });
      }
    }
  }

  render() {
    const getFieldProps = this.props.getFieldProps;
    const formItemLayout = this.props.formItemLayout || {};
    const label = this.props.label || '时间范围';
    const size = this.props.size || 'default';
    const id = this.props.id;
    const format = this.props.format || 'yyyy-MM-dd'

    return (
      <div>
        <FormItem className="notRequired-FormItem" label={label} {...formItemLayout}>
          <RangePicker size={size}  format={format} {...getFieldProps(id, { initialValue: this.state.selectDate }) } />
        </FormItem>
        <RadioGroup size='small' onChange={this.getRadioValue.bind(this)} style={{ marginLeft: '25%' }}>
          <RadioButton key="a" value={"deliveryWeek"}>本周</RadioButton>
          <RadioButton key="b" value={'deliveryMonth'}>本月</RadioButton>
          <RadioButton key="c" value={'deliveryQuarter'}>本季</RadioButton>
          <RadioButton key="d" value={'deliveryYear'}>本年</RadioButton>
        </RadioGroup>
      </div>
    )
  }
}

// 作为独立组件，通过下面的方式来让使用方传入所需的属性和方法
FormItemRangePicker.propTypes = {
  id: PropTypes.string.isRequired,
  getFieldProps: PropTypes.func.isRequired,
};
