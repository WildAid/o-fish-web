import React from "react";
import { Redirect } from "react-router-dom";

import AuthService from "../services/auth.service";

const authService = AuthService.getInstance();

const mapRouting = (routes) => {
  return routes.map(route => {
    if (route.routes && route.routes.length) {
      route.routes = mapRouting(route.routes);
    }

    route.render = props => {
      const auth = authService.isStitchAuthenticated;

      if (route.auth){
        if (!auth){
          return <Redirect to="/login" />;
        } else {
          if (!authService.isAuthenticated){
            authService.reauthenticateUser();
          }
        }
      }

      if (route.redirectTo) return <Redirect to={route.redirectTo} />;

      if (route.routes){
        return <route.component isLoggedIn={auth} {...props} routes={route.routes}/>;
      } else {
        return <route.component isLoggedIn={auth} {...props} />;
      }
    };

    return route;
  });
};

export default mapRouting;
