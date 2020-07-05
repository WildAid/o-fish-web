import React, { createContext, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import AuthService from "../../services/auth.service";
import { LOGIN_PAGE } from "../../root/root.constants";

const authService = AuthService.getInstance();

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: authService.user,
    isAuthenticated: authService.isAuthenticated,
  });

  const logout = async () => {
    await authService.logout();
    setAuth({ ...auth, isAuthenticated: false, user: null });
  };

  const authenticate = async (login, pass) => {
    const user = await authService.authenticate(login, pass);
    setAuth({ ...auth, isAuthenticated: true, user });
  };

  return (
    <AuthContext.Provider value={{ ...auth, logout, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("You must call useAuth() inside of a <AuthContext />");
  }
  return context;
}

export function withAuth(WrappedComponent) {
  return (props) => {
    const auth = useAuth();

    return <WrappedComponent {...auth} {...props} />;
  };
}

export function requireAuth(WrappedComponent) {
  return (props) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: LOGIN_PAGE,
            state: { from: props.location },
          }}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };
}
