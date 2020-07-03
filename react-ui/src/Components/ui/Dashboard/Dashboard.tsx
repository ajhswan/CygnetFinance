import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

interface IDashboardProps {
    logoutUser: Function,
    auth: any    
}

class Dashboard extends Component<IDashboardProps> {

    static propTypes = {
        logoutUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    onLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div>
                <h4>
                    <b> Hey there,</b> {user.name.split(' ')[0]}
                    <p> You are logged into a full-stack Dashboard</p>
                </h4>
                <button onClick={this.onLogoutClick} className='btn btn-large hoverable blue accent-3'>
                    Logout
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps, 
    { logoutUser }
) (Dashboard);