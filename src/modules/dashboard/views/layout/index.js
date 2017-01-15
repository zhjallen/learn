

//引入样式表
import style from './style.less';

import DashboardHeader from './components/Header'
import DashboardSidebar from './components/Sidebar'
//import footer from './components/footer'

import {logout} from '../../../user/actions/auth';
import {toggerSidebarFolded} from '../../actions/layout';


import constant from '../../'
@connect(
  state => {
    return {
      user: state['user'],
      dashboard: state[constant.NAME]
    };
  },
  dispatch => bindActionCreators({ logout, toggerSidebarFolded }, dispatch)
)

export default class DashboardLayout extends Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    console.log('componentWillMount');
    //如果已经处于登录状态，则跳转到首页
    if (!this.props.user.auth.user.token) {
      History.replace('/user/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    //如果没有处于登录状态，则跳转到登录页面
    if (!nextProps.user.auth.user.token) {
      History.replace('/user/login');
    }
  }
  render() {
    const folded = this.props.dashboard.layout.sidebarfolded;
    const pathname = this.props.location.pathname;
    const modules = this.props.dashboard.modulemgr.modules;
    let modulename = '';
    for (let module of modules) {
      if (module.parentpath != 'dashboard')
        continue;
      if (!module.menu) continue;
      if (!module.menu.submenus) continue;
      for (let submenu of module.menu.submenus) {
        let newname = '/dashboard/' + submenu.path;
        if (newname == pathname) {
          modulename = module.menu.displayname + '/' + submenu.displayname;
          break;
        }
      }
    }
    return (
      <div className="ant-layout-aside">
        <DashboardSidebar route={this.props.route} modules={this.props.dashboard.modulemgr.modules} folded={folded}/>
        <div className="ant-layout-main" style={folded ? { marginLeft: '72px' } : {}}>
          <DashboardHeader username={this.props.user.auth.user.username} logout={this.props.logout} currentlocation={modulename} folded={folded} toggerFolded={this.props.toggerSidebarFolded}/>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}