import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

interface IPrivateRouteProps extends RouteProps {
    component: any,
    auth: any
}

const PrivateRoute = ({ component: Component, auth, ...rest }: IPrivateRouteProps) => (
    <Route
        {...rest}
        render={props => 
        auth.isAuthenticated === true ? (<Component {...props} />) : (<Redirect to='/login' />)
        }
        />
);

// PrivateRoute.propTypes = {
//     auth: PropTypes.object.isRequired
// };

const mapStateToProps = (state:any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);