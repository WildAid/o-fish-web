import React from 'react';
import { useRoutes } from 'react-router-dom';
import mapRouting from '../../helpers/map-routing';
import ErrorBoundary from '../error-boundary/error-boundary.component';

const Agencies = (props) => {
  const { routes } = props;
  const mappedRoutes = useRoutes(mapRouting(routes));

  return (<ErrorBoundary>
    {mappedRoutes}
  </ErrorBoundary>);
}

export default Agencies;
