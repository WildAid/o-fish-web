import React from "react";
import { useRoutes } from 'react-router-dom';
import ErrorBoundary from '../components/error-boundary/error-boundary.component';

import Header from "../components/header/header.component";
import mapRouting from "../helpers/map-routing";

import "./root.css";

export default function Root(props) {
  const { routes } = props;
  const mappedRoutes = useRoutes(mapRouting(routes));
  return (
    <div className="root">
      <Header />
      <main id="main-content">
        <ErrorBoundary>
          {mappedRoutes}
        </ErrorBoundary>
      </main>
    </div>
  );
}
