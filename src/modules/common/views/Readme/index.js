//引入样式表
import style from './style.less';
import { Button, Alert } from 'antd'

import constant from '../../'
@connect(
  state => state[constant.NAME],   //会把此模块下的所有reducer对于的状态值引入
  dispatch => bindActionCreators({}, dispatch)
)

export default class Readme extends Component{
  constructor(props){
    super();
  }

  render(){
    return (
      <div>
        <p>这是关于NOMES的组件说明和测试的菜单</p>
        <p>包括基础组件和复合组件，但这些组件都不改写后台数据</p>
        <p>基础组件：不对后台数据进行操作</p>
        <p>复合组件：需要读取后台数据进行操作</p>
      </div>
    );
  }
}