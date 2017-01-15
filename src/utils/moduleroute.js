import React,{PropTypes} from 'react';
const ModuleRoute = React.createClass({
  statics: {
    createRouteFromReactElement(element, parentRoute) {
      if ((parentRoute) && (parentRoute.added != true)) {
        //注册当前路由信息到全局的集合中
        if(window.modules==undefined) window.modules=[];
        console.log(parentRoute);
        window.modules.push({
          parentpath:parentRoute.path,
          menu:element.props.menu
        });
        //添加实际的路由
        let route = (
          //------------------此部分可以修改-------------------
          <Route added={true} {...element.props}>
            {element.props.children}
          </Route>
          //--------------------------------------------------
        );
        parentRoute.children.push(route);
      }
    }
  },
  propTypes: {
    menu: PropTypes.object.isRequired
  },
  render() {}
})

export default ModuleRoute;