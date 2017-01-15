
//引入样式表
//import style from './style';

import constant from '../../'
@connect(
  state => state[constant.NAME],
  dispatch => bindActionCreators({}, dispatch)
)

export default class DashboardContent extends Component{
  constructor(props){
    super();
  }

  render(){
    return (
      <div className="content">
        默认内容页面
      </div>
    );
  }
}