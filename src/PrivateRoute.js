import React from 'react';
import { withRouter } from 'react-router-dom'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route {...rest} render={ props => 
    currentUser  ?  <Component {...props} /> : <Redirect to="/login" />
  }
  />
);

const mapStateToProps = state => ({
   currentUser: state.currentUser
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
