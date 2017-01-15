import constant from '../'

//定义初始状态
const initState = {
  modules:window.modules=[]
};

export default function reducer(state = initState, action){
  switch(action.type){
    case constant.REGISTER_MODULE:
      return {
        ...state,
        modules: [{name:action.type}]
      };
    default :
      return state;
  }
}