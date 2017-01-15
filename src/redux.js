import {Provider} from 'react-redux';

//引入并合并reducers
//REDUX只有一颗状态树，为了避免这个状态树变得越来越复杂，
//REDUX通过 Reducers来负责管理整个应用的State树，而Reducers可以被分成一个个Reducer
//在使用时，可以将这些子Reducer连接成一个大的Reducer
//import { tokenReducer } from 'redux-auth';
//------------------此部分可以修改-------------------
import user from './modules/user/reducers';
import dashboard from './modules/dashboard/reducers';
import home from './modules/home/reducers';
import project from './modules/project/reducers';
import common from './modules/common/reducers'
const reducers = combineReducers({
  //token: tokenReducer,
  user,dashboard,home,project,common});
//---------------------------------------------------


//初始化STORE和MIDDLEWARE,并与REDUCERS建立连接
import createStore from './utils/store';
const store = createStore()(reducers);
window.store=store;

//默认类
export default class Redux extends Component{
  constructor(){
    super();
  }

  render(){
    return (
      <Provider {...this.props} store={store}>
          {this.props.children}
      </Provider>
    );
  }
}