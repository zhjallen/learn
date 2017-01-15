//引入样式表
import style from './style.less';
import { Button, Alert } from 'antd'

import constant from '../../'
@connect(
  state => state[constant.NAME],   //会把此模块下的所有reducer对于的状态值引入
  dispatch => bindActionCreators({}, dispatch)
)

export default class Layout extends Component{
  constructor(props){
    super();
  }

  render(){
    console.log(this.props.location)
    return (
      <div className="project-new-container">
        <div style={{ marginTop: '6px', marginBottom: '10px' }}>
          <Link to={this.props.location.pathname.substring(0,this.props.location.pathname.length-this.props.route.path.length-1)}>
            <Button type="primary" icon="file" style={{ marginRight: "10px" }}>
              保存
            </Button>
          </Link>
          <Link to={this.props.location.pathname + ''}>
            <Button type="default" icon="edit" style={{ marginRight: "10px" }}>取消</Button>
          </Link>
        </div>
        aaa
      </div>
    );
  }
}