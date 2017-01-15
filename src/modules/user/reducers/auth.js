import constant from '../'
import { notification } from 'antd'

//定义初始状态
//Redux 认为，一个应用程序中，所有应用模块之间需要共享访问的数据，都应该放在 State 对象中
const initState = {
  user: {
    username: !!window.localStorage.getItem('username') ? window.localStorage.getItem('username') : '未登录',
    isLogin: false,
    token: !!window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '',
  }
};
window.EntId = ''
window.EntId = window.localStorage.getItem('entid')

//应该确保 State 中每个节点都是 Immutable 的
//这样框架在判断数据是否变化时，无需进行Deep Equal 的遍历，只要用类似的语句即可进行简单的引用比较即可
//newState.todos === prevState.todos
//为了确保这一点，在Reducer 中更新 State 成员需要这样做：
//`newState = {...oldState, name: 'new name'}`
//不能简单的采用下面的写法
//oldState.name='new name'
//需要遵循上面的规范，或者强制引入Immutable.js对旧的state进行保护
export default function reducer(state = initState, action) {
  console.log(action);
  switch (action.type) {
    case `${constant.LOGIN}_PENDING`:
    window.EntId = '/'
      return {
        ...state,
        isLogin: true,
        error: false,
        message: '',
        user: {
          username: '登陆中',
          token: ''
        }
      };
    case `${constant.LOGIN}_SUCCESS`:
      window.localStorage.setItem('username', action.payload.body.user.username);
      window.localStorage.setItem('token', action.payload.body.token);
      window.localStorage.setItem('entid', action.payload.body.user.entid);
      window.EntId = action.payload.body.user.entid ? action.payload.body.user.entid : '';
      return {
        ...state,
        isLogin: false,
        error: false,
        message: '',
        user: {
          username: action.payload.body.user.username,
          token: action.payload.body.token
        }
      };
    case `${constant.LOGIN}_ERROR`:
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('empid');
      window.EntId = '/'
      notification.error({
        message: '登录失败',
        description: action.payload.message
      });
      return {
        ...state,
        isLogin: false,
        error: true,
        message: action.payload.message,
        user: {
          username: '未登录',
          token: ''
        }
      };
    case constant.LOGOUT:
      window.localStorage.clear();//清除localStorage
      //强制刷新页面，以便重新初始化stroe（reducer）中数据
      window.location.reload(true);      
      window.EntId = null;
      return {
        ...state,
        isLogin: false,
        error: false,
        message: '',
        user: {
          username: '未登录',
          token: ''
        }
      };
    default:
      return state;
  }
}