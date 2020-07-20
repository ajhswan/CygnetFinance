import React, { Component } from 'react';
// import PlaidLinkButton from 'react-plaid-link-button';
// import { PlaidLink } from 'react-plaid-link';
// import PropTypes from 'prop-types';
import PlaidButton from '../PlaidButton';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { getAccounts, addAccount } from '../../../actions/accountActions';
import Accounts from './Accounts';
import Spinner from '../Spinner';
import './PlaidButton.css'

interface IDashboardProps {
    logoutUser: Function,
    getAccounts: Function,
    addAccount: Function,
    plaid: any,
    auth: any    
}

class Dashboard extends Component<IDashboardProps> {

    componentDidMount() {
        this.props.getAccounts();
    }

    onLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        const { accounts, accountsLoading } = this.props.plaid;

        if (accounts === null || accountsLoading) {
            return <Spinner />;
        } else if (accounts.length > 0) {
            return <Accounts user={user} accounts={accounts} />;
        } else {
            return (
                <div className='row'>
                    <div className='col s12 center-align'>
                        <h4>
                            <b>Welcome,</b> {user.name.split(' ')[0]}
                        </h4>
                        <p className='flow-text grey-text text-darken-1'>
                            To get started, link your a bank account below
                        </p>
                        <div>
                            <PlaidButton label='Link Account'/>
                        </div>
                        <button onClick={this.onLogoutClick} className='btn btn-large waves-effect waves-light hoverable red accent-3 main-btn'>
                            Logout
                        </button>
                    </div>
                </div>
            );
        }        
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    plaid: state.plaid
});

export default connect(
    mapStateToProps, 
    { logoutUser, getAccounts, addAccount }
) (Dashboard);