import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isError,
  ...rest
}) {
  const signed = false;

  if (!isError && !signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (!isError && signed && !isPrivate) {
    return <Redirect to="/students" />;
  }

  if (isError) {
    return <Route {...rest} render={props => <Component {...props} />} />;
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
