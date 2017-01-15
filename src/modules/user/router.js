
//------------------此部分可以修改-------------------
import layout from './views/layout';
import login from './views/login';
import register from './views/register';
import profile from './views/profile';
//--------------------------------------------------

const menu={
  icon:"user",
  displayname:"用户管理",
  submenus:[
    {
      icon:"user",
      displayname:"登录",
      path:'user/login'
    },
    {
      icon:"user",
      displayname:"注册",
      path:'user/register'
    }
  ]
}
export default (
  //------------------此部分可以修改-------------------

  <ModuleRoute menu={menu}  path='user' component={layout}>
    <IndexRoute component={profile} />
    <Route path="login" component={login} />
    <Route path="register" component={register} />
    <Route path="profile" component={profile} />
  </ModuleRoute>
  //--------------------------------------------------
)
