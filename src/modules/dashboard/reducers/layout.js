import constant from '../'

//定义初始状态
const initState = {
  sidebarfolded: false
};

export default function reducer(state = initState, action){
  switch(action.type){
    case constant.TOGGER_SIDEBAR_FOLDED:
      return {
        ...state,
        sidebarfolded: !state.sidebarfolded
      };
    default :
      return state;
  }
}