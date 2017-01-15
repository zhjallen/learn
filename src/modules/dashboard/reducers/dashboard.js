const constant = Constant('dashboard');

//定义初始状态
const initState = {
  cards: []
};

export default function reducer(state = initState, action){
  switch(action.type){
    case constant.of('DASHBOARD_CLEAR'):
      return {
        ...state,
        cards: []
      };
    case constant.of('DASHBOARD_ADDITEM'):
      return {
        ...state,
        cards: [{name:'aaa'}]
      };
    default :
      return state;
  }
}