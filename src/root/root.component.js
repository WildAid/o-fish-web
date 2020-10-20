import React from "react";
import { renderRoutes } from "react-router-config";

import Header from "../components/header/header.component";

import "./root.css";

export default function Root(props){
  const { route } = props;
  const routes = renderRoutes(route.routes);

  return (
    <div className="root">
      <Header />
      <main>{routes}</main>
    </div>
  );
}
