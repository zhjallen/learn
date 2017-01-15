import constant from '../../'

//引入样式表
//import style from './style';
//引入动作
import * as authAction from './../../actions/auth';
import { Form, Input, Button, Row, Col, notification } from 'antd'

@connect(
  state => state[constant.NAME],
  dispatch => bindActionCreators({}, dispatch)
)



class Profile extends Component {
  constructor(props) {
    super();
  }
  
  
  submitHandler(e){
    e.preventDefault();   
    store.dispatch(authAction.logout());
  }

  componentWillUpdate(nextProps, nextState) {
    //if(nextProps.login.isLogin)
    //{
    //  History.push('login');
    //}
  }

  render() {
    return (
      <div>
          当前用户：{this.props.auth.user.username}
          <Button type="primary" onClick={this.submitHandler.bind(this)}>注销</Button>
      </div>
    );
  }
}

export default Profile;