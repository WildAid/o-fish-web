import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

class Users extends Component<any> {
  render() {
    const { routes } = this.props.route;

    return <div>{renderRoutes(routes)}</div>;
  }
}

export default Users;
