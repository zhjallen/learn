//引入样式表
import style from './style.less';

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
    return (
      <div className="form-container">
        {this.props.children}
      </div>
    );
  }
}