//------------------此部分可以修改-------------------
import homepage from './views/homepage';
import UpLoad from './views/upload'
import antTable from './views/antTable'
//--------------------------------------------------
const menu = {
  icon: "desktop",
  displayname: "我的测试",
  submenus: [
    {
      icon: "home",
      displayname: "默认首页",
      path: 'home'
    }
    , {
      displayname: "测试antd-upload",
      path: 'home/upload'
    }
    , {
      displayname: "测试antd-Table",
      path: 'home/Table'
    }]
}

const HomeRouter = (
  //------------------此部分可以修改-------------------
  <ModuleRoute menu={menu} path='home'>
    <IndexRoute component={homepage} />
    <Route path='upload' component={UpLoad}/>
    <Route path='Table' component={antTable}/>
  </ModuleRoute>
  //--------------------------------------------------
);
export default HomeRouter; 