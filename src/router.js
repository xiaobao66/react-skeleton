import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import dynamic from 'store/dynamic';
import store from 'store/store';
import 'themes/default.less';
import 'assets/styles/index.less';

function renderRoutes(routes, parentPath = '') {
  return routes.reduce((memo, { path, childRoutes, component, models }) => {
    const compilePath = parentPath ? `${parentPath}/${path}` : path;
    let childComponents = [];
    if (childRoutes && childRoutes.length > 0) {
      childComponents = renderRoutes(childRoutes, compilePath);
    }

    if (!component) {
      return memo.concat(childComponents);
    }

    return memo.concat(
      <Route
        key={compilePath}
        path={compilePath}
        exact
        component={dynamic({
          store,
          component,
          models,
        })}
      />,
      ...childComponents,
    );
  }, []);
}

const Routers = () => {
  const error = () => <div>404</div>;

  const routes = [
    {
      path: '/',
      component: () => import('pages/home'),
    },
    {
      path: '/dashboard',
      component: () => import('pages/dashboard'),
      models: () => [import('models/dashboard')],
    },
  ];

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {renderRoutes(routes)}
          <Route component={error} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Routers;
