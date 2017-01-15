import React from 'react';
import { Form, Checkbox, Col, Row } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

export default class FormItemCheckbox extends Component {
  constructor() {
    super();
    this.state = {
      checkedList: [],
      checkAll: false,
    }
  }

  componentDidMount() {
    let defaultCheckedList = this.props.defaultCheckedList || [];
    let plainOptions = this.props.plainOptions;

    const id = this.props.id;
    this.props.setFieldsValue({ [id]: defaultCheckedList });
    this.setState({
      checkedList: defaultCheckedList,
      checkAll: defaultCheckedList.length === plainOptions.length,
    })
  }

  componentWillReceiveProps(newProps) {
    const self = this;
  }

  onChange(checkedList) {

    const id = this.props.id;
    this.props.setFieldsValue({ [id]: checkedList });

    let plainOptions = this.props.plainOptions;
    this.setState({
      checkedList,
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  onCheckAllChange(e) {
    let plainOptions = this.props.plainOptions;
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      checkAll: e.target.checked,
    });
    const id = this.props.id;
    e.target.checked ? this.props.setFieldsValue({ [id]: plainOptions }) : this.props.setFieldsValue({ [id]: [] });
  }

  render() {
    let plainOptions = this.props.plainOptions;
    const getFieldProps = this.props.getFieldProps;

    const formItemLayout = this.props.formItemLayout || { labelCol: { span: 4 }, wrapperCol: { span: 18 }, };
    const label = this.props.label || '状态';
    let mode = this.props.mode || 'inarow';
    let id = this.props.id || 'checks'
    console.log('id', id)

    return (
      mode === 'inarow' ?
        <div>
          <FormItem style={{ marginBottom: '0px' }} label={label} {...formItemLayout}>
            <div style={{ marginTop: '3px' }}>
              <Checkbox style={{ float: 'left' }}
                onChange={this.onCheckAllChange.bind(this)}
                checked={this.state.checkAll}
                >
                全选 <span className="ant-divider" ></span>
              </Checkbox>
              <CheckboxGroup style={{ float: 'left' }} {...getFieldProps(id) }
                options={plainOptions} value={this.state.checkedList} onChange={this.onChange.bind(this)} />
            </div>
          </FormItem>
        </div>
        :
        <div>
          <FormItem style={{ marginBottom: '0px' }} label={label} {...formItemLayout}>
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                onChange={this.onCheckAllChange.bind(this)}
                checked={this.state.checkAll}
                >
                全选
          </Checkbox>
            </div>            
            <CheckboxGroup options={plainOptions} {...getFieldProps(id) }
              value={this.state.checkedList} onChange={this.onChange.bind(this)} />
          </FormItem>
        </div>
    )
  }
}

// 作为独立组件，通过下面的方式来让使用方传入所需的属性和方法
FormItemCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  plainOptions: PropTypes.array.isRequired,
  getFieldProps: PropTypes.func.isRequired,
};
