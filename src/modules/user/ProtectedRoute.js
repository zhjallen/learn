const validate = function (next, replace, callback) {
  const haslogged = !!window.localStorage.getItem('token')
  if (!haslogged && next.location.pathname != '/user/login') {
    //replace('/user/login')
  }
  callback()
}

const ProtectedRouter = React.createClass({
  getDefaultProps: function () {
    return {
      onEnter:validate
    };
  },
  render: function () {
    return (null);
  }
});

export default ProtectedRouter;