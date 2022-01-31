import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthService from "../services/auth.service";

const authService = AuthService.getInstance();

const mapRouting = (routes) => {
  const mappedRoutes = routes.map(route => {
    const mappedRoute = {
      path: route.path,
    }
    if (route.children && route.children.length) {
      mappedRoute.children = mapRouting(route.children);
    }


    const auth = authService.isStitchAuthenticated;

    if (route.auth) {
      if (!auth) {
        mappedRoute.element = <Navigate to="/login" />;
        return mappedRoute;
      } else {
        if (!authService.isAuthenticated) {
          authService.reauthenticateUser();
        }
      }
    }

    if (route.redirectTo) {
      mappedRoute.element = <Navigate to={route.redirectTo} />;
      return mappedRoute;
    };

    if (route.children) {
      mappedRoute.element = <>
        <route.component isLoggedIn={auth} routes={route.children} />
        <Outlet />
      </>;
      return mappedRoute;
    } else {
      mappedRoute.element = <route.component isLoggedIn={auth} />;
      return mappedRoute;
    }
  });
  return mappedRoutes;
};

export default mapRouting;
