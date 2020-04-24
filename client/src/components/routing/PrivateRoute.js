import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// [*] Create a protected React Route for user's dashboard
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { isAuthenticated, loading } = auth;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProp)(PrivateRoute);
