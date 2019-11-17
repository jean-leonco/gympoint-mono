import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Dashboard from '../pages/_layouts/Dashboard';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isError,
  ...rest
}) {
  const signed = true;

  if (!isError && !signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (!isError && signed && !isPrivate) {
    return <Redirect to="/students" />;
  }

  if (isError) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }

  if (signed) {
    return (
      <Route
        {...rest}
        render={props => (
          <Dashboard>
            <Component {...props} />
          </Dashboard>
        )}
      />
    );
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
  isError: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isError: false,
};
