
//引入样式表
import style from './style.less';

import { Row,Col,Menu, Icon } from 'antd'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class DashboardHeader extends Component {

  constructor(props) {
    super();
  }

  logoutHandler(e) {
    console.log(e)
    if (e.key == 'setting:4')
      this.props.logout();
  }

  toggerFoldedHandler(e) {
    this.props.toggerFolded();
  }

  render() {
    const toggermenustyle=this.props.folded?'menu-unfold':'menu-fold';
    return (
      <Row className='ant-layout-header'>
        <Col span='2' style={{padding:'12px'}}>
        <a onClick={this.toggerFoldedHandler.bind(this) }><Icon type={toggermenustyle} style={{fontSize:'18px'}}/></a>
        </Col>
        <Col>
        <Menu className="header-menu" selectedKeys={['location']} mode="horizontal" onClick={this.logoutHandler.bind(this) }>
          <SubMenu className="header-menu-item" title={<span><Icon type="user" />{this.props.username}</span>}>
            <Menu.Item key="setting:1">个人资料</Menu.Item>
            <Menu.Item key="setting:2">账户与安全</Menu.Item>
            <Menu.Item key="setting:3">我的公司</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="setting:4">注销</Menu.Item>
          </SubMenu>
          <Menu.Item key="mail">
            <Icon type="question" />帮助
          </Menu.Item>
          <Menu.Item key="location" style={{float:"left",marginLeft:"30%"}}>
            {this.props.currentlocation}
          </Menu.Item>
        </Menu>
        </Col>
      </Row>
    );
  }
}

//作为独立组件，通过下面的方式来让使用方传入所需的属性和方法
DashboardHeader.propTypes = {
  currentlocation: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  toggerFolded: PropTypes.func.isRequired,
  folded:PropTypes.bool.isRequired
};

export default DashboardHeader;