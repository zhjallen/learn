
//引入样式表
import style from './style.less';

import { Menu, Icon } from 'antd'
import { Link } from 'react-router'

const SubMenu = Menu.SubMenu

class DashboardSidebar extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { modules } = this.props
    let openKey = []
    const mode = this.props.folded ? 'vertical' : 'inline';

    const foldedstyle = {
      width: '72px'
    };

    const menus = modules.map((moduleitem) => {
      if (moduleitem.menu.displayname == '我的测试') {
        openKey.push('sub_' + moduleitem.parentpath + '_' + moduleitem.menu.icon)
      }
      return (
        <SubMenu
          key={'sub_' + moduleitem.parentpath + '_' + moduleitem.menu.icon}
          title={<span><Icon type={moduleitem.menu.icon} />{this.props.folded ? '' : moduleitem.menu.displayname}</span>}
          >
          {moduleitem.menu.submenus.map((submenu) => {
            return (
              <Menu.Item key={'menu_' + moduleitem.parentpath + '_' + moduleitem.menu.icon + submenu.path}>
                <Link to={'/' + (moduleitem.parentpath == '/' ? '' : moduleitem.parentpath + '/') + submenu.path}>
                  {submenu.displayname}
                </Link>
              </Menu.Item>
            )
          }) }
        </SubMenu>
      )
    });
    return (
      <aside className="ant-layout-sider" style={this.props.folded ? foldedstyle : {}}>
        <div className="ant-layout-logo"><img src='/static/images/logo.svg' height='32px'/></div>
        <Menu mode="inline" theme="light" defaultOpenKeys={openKey} mode={mode}>
          {menus}
        </Menu>
      </aside>
    );
  }
}

//作为独立组件，通过下面的方式来让使用方传入所需的属性和方法
DashboardSidebar.propTypes = {
  modules: PropTypes.array.isRequired,
  folded: PropTypes.bool.isRequired
};

export default DashboardSidebar;