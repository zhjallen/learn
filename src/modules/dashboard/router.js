
//------------------此部分可以修改-------------------
import layout from './views/layout';
import content from './views/content';
//--------------------------------------------------

const DashboardRoute = React.createClass({
  statics: {
    createRouteFromReactElement(element, parentRoute) {
      if ((parentRoute) && (parentRoute.added != true)) {
        let dashboard = (
          //------------------此部分可以修改-------------------
          <RootRoute path='dashboard' component={layout}>
            <IndexRoute component={content}/>
            {element.props.children}
          </RootRoute>
          //--------------------------------------------------
        );
        parentRoute.children.push(dashboard);
      }
    }
  },
  render() {}

})

export default DashboardRoute;