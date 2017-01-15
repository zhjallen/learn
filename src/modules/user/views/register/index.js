import constant from '../../'

//引入样式表
//import style from './style';
//引入动作
import * as authAction from './../../actions/auth';
import { Form, Input, Button, Row, Col,Switch } from 'antd'
const FormItem = Form.Item


@connect(
  state => state[constant.NAME],
  dispatch => bindActionCreators({}, dispatch)
)

class Register extends Component {
  constructor(props) {
    super();
  }

  submitHandler(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      const data = this.props.form.getFieldsValue();
      store.dispatch(authAction.register(data.user,data.phone, data.password));
    });
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form horizontal form={this.props.form}  onSubmit={this.submitHandler.bind(this)}>
        <FormItem>
          <span style={{textAlign:'center'}}><h2>注册用户</h2></span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户名："
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('user') || []).join(', ') }
          >
          <Input disabled={this.props.auth.isLogin} required  placeholder="请输入用户名"  {...getFieldProps('user')} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号："
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('phone') || []).join(', ') }
          >
          <Input disabled={this.props.auth.isLogin} required  placeholder="请输入手机号"  {...getFieldProps('phone')} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码："
          hasFeedback
          >
          <Input disabled={this.props.auth.isLogin} required type="password" autoComplete="off"   placeholder="请输入密码"  {...getFieldProps('password')} 
            />
        </FormItem>
        <FormItem style={{marginBottom:'5px'}} wrapperCol={{ span: 16, offset: 8 }}>
          <Button style={{width:'100%'}} disabled={this.props.auth.isLogin} type="primary" htmlType='submit'>注册</Button>
        </FormItem>
        <FormItem>
          <div style={{textAlign:'right'}}><span>已经注册过账号？<Link to='/user/login'>立即登录</Link></span></div>
        </FormItem>
      </Form>
    );
  }
}

Register = Form.create()(Register);

export default Register