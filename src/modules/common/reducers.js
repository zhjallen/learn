//------------------此部分可以修改-------------------
import common from './reducers/common';
//------------------------------ -------------------

//假如有多个Reducer，则需要将他们合并
//reducer合并后，每个reducer的state会自动添加到storestate中
//可以通过state['模块名']['reducer名称']访问具体的state变量
export default combineReducers({
  //------------------此部分可以修改-------------------
  common
  //------------------------------ -------------------
});