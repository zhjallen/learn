//------------------此部分可以修改-------------------
import modulemgr from './reducers/modulemgr';
import layout from './reducers/layout';
//--------------------------------------------------


//假如有多个Reducer，则需要将他们合并
export default combineReducers({
  //------------------此部分可以修改-------------------
  modulemgr,
  layout
  //--------------------------------------------------
});