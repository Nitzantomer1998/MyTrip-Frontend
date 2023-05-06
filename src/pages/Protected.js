import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
function Protected({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to='/sign-in' />;
  }
  return children;
}

Protected.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default Protected;
