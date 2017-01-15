//------------------此部分可以修改-------------------
import ProjectLayout from './views/ProjectLayout';
import ProjectList from './views/ProjectList';
import ProjectDetail from './views/ProjectDetail';
import NewProject from './views/NewProject';
import UpdateProject from './views/UpdateProject';

//--------------------------------------------------
const menu={
  icon:"windows",
  displayname:"项目管理",
  submenus:[
    {
      icon:"project",
      displayname:"项目列表",
      path:'project'
    },
    {
      icon:"project",
      displayname:"项目列表1",
      path:'project/detail/:id'
    }
  ]
}
export default(
    //------------------此部分可以修改-------------------
    <ModuleRoute menu={menu}  path='project' component={ProjectLayout}>
      <IndexRoute component={ProjectList} />
      <Route path="new" component={NewProject} />
      <Route path="detail/:id" component={ProjectDetail} />
      <Route path="edit/:id" component={UpdateProject} />
      <Route path="*" component={NotFound} />
    </ModuleRoute>
    //--------------------------------------------------
)