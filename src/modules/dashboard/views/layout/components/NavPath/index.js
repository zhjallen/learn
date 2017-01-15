import { Breadcrumb } from 'antd'
import { Link } from 'react-router'

import './index.less'

const defaultProps = {
  navpath: []
}

const propTypes = {
  navpath: PropTypes.array
}

class NavPath extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { navpath } = this.props
    const bread = navpath.map((item)=>{
      return (
        <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
      )
    })
    return (
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item key='bc-0'><Link to='/dashboard/home'>首页</Link></Breadcrumb.Item>
          {bread}
        </Breadcrumb>
      </div>
    )
  }
}
NavPath.propTypes=propTypes;
NavPath.defaultProps=defaultProps;

export default NavPath;