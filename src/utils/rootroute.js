import React from 'react';

const RootRoute = React.createClass({
  render() {
    return (
      <Route added={true}>
        {this.props.children}
      </Route>
    )
  }
});

export default RootRoute;