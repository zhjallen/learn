import constant from '../../'

//引入样式表
import style from './style.less';
import { Row, Col, Button ,Carousel } from 'antd'

@connect(
  state => state[constant.NAME],
  dispatch => bindActionCreators({}, dispatch)
)

export default class Layout extends Component {
  constructor(props) {
    super();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    //如果已经处于登录状态，则跳转到首页
    if ((!!nextProps.auth.user.token) 
    && (nextProps.location.pathname!="/user/register")) {
      History.replace('/');
    }
  }

  render() {
    return (
      <Row style={{height:'100%'}} type="flex" justify="space-between" align="middle">
        <Col>
          <Row className="auth-container" type="flex" justify="space-between" align="middle">
          <Col span="12" {...this.props} className="splash">
            <Carousel className="auth-splash">
              <div style={{margin:'100px'}}><img src='/static/images/logo.png'/></div>
              <div><FormattedMessage id="app.splash" /></div>
            </Carousel>
          </Col>
          <Col span="12" className="form-container">
            {this.props.children}
          </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}