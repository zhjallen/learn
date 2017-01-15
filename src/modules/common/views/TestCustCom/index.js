//引入样式表
import style from './style.less';
import { Form } from 'antd';


const FormItem = Form.Item;
import FormItemCheckbox from '../../baseComponets/FormItemCheckbox'

class TestCustCom extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }


  render() {
    const { getFieldProps, getFieldValue, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    const plainOptions = ['未提交', '审核中', '执行中', '已结单'];
    const defautOptions = ['未提交', '执行中', '已结单'];
    return (
      <div className="home-container code-box">
        <FormItemCheckbox label="排在一行的Checkbox" id="orderStatus" getFieldProps={getFieldProps} setFieldsValue={setFieldsValue}
          plainOptions={plainOptions} defaultCheckedList={defautOptions} />
        <hr />
        <FormItemCheckbox mode='vertical' label="分行的Checkbox" id="orderStatus" getFieldProps={getFieldProps} setFieldsValue={setFieldsValue}
          plainOptions={plainOptions} defaultCheckedList={defautOptions} />
      </div>
    );
  }
}

TestCustCom = Form.create()(TestCustCom);

export default TestCustCom;

