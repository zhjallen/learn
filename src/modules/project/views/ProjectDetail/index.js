//引入样式表
import style from './style.less';
import {Button} from 'antd'

export default class Detail extends Component {
  constructor(props) {
    super();
  }
  showDetail() {
    let a = []
    if (a) {
      window.alert(a)
    }
  }
  render() {
    return (
      <div className="home-container code-box">
        <Button onClick={this.showDetail.bind(this) }>测试</Button>
      </div>
    );
  }
}