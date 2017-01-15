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

class Login extends Component {
  constructor(props) {
    super();
  }

  submitHandler(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      const data = this.props.form.getFieldsValue();
      store.dispatch(authAction.login(data.user, data.password));
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
          <span style={{textAlign:'center'}}><h2>登录账号</h2></span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户名："
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('user') || []).join(', ') }
          >
          <Input disabled={this.props.auth.isLogin} required  placeholder="请输入用户名或手机号"  {...getFieldProps('user')} />
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
          <Switch size="small"/>下次自动登录
        </FormItem>
        <FormItem style={{marginBottom:'5px'}} wrapperCol={{ span: 16, offset: 8 }}>
          <Button style={{width:'100%'}} disabled={this.props.auth.isLogin} type="primary" htmlType='submit'>登录</Button>
        </FormItem>
        <FormItem>
          <div style={{textAlign:'right'}}><span>还没有账号？<Link to='/user/register'>立即注册</Link></span></div>
        </FormItem>
      </Form>
    );
  }
}

Login = Form.create()(Login);

export default Login