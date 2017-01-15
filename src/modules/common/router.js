//------------------此部分可以修改-------------------
import Readme from './views/Readme';
import TestOrderbill from './views/TestOrderbill';
import TestPlanbill from './views/TestPlanbill';
import TestCustCom from './views/TestCustCom';

//--------------------------------------------------
const menu={
  icon:"tablet",
  displayname:"我的组件测试",
  submenus:[
    {
      displayname:"说明",
      path:'comtest'
    },
    {
      displayname:"查询计划明细",
      path:'comtest/planbill'
    },
    {
      displayname:"查询订单明细",
      path:'comtest/orderbill'
    },
    {
      displayname:"自定义组件",
      path:'comtest/custCom'
    }
  ]
}
export default(
    //------------------此部分可以修改-------------------
    <ModuleRoute menu={menu}  path='comtest'>
      <IndexRoute component={Readme} />
      <Route path="orderbill" component={TestOrderbill} />
      <Route path="planbill" component={TestPlanbill} />
      <Route path="custCom" component={TestCustCom} />
    </ModuleRoute>
    //--------------------------------------------------
)