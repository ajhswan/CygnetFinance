import React, { Component } from 'react';
import PlaidLinkButton from 'react-plaid-link-button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { getAccounts, addAccount } from '../../../actions/accountActions';
import Accounts from './Accounts';

interface IDashboardProps {
    logoutUser: Function,
    getAccounts: Function,
    addAccount: Function,
    plaid: any,
    auth: any    
}

class Dashboard extends Component<IDashboardProps> {

    // static propTypes = {
    //     logoutUser: PropTypes.func.isRequired,
    //     getAccounts: PropTypes.func.isRequired,
    //     addAccount: PropTypes.func.isRequired,
    //     plaid: PropTypes.object.isRequired,
    //     auth: PropTypes.object.isRequired
    // };

    componentDidMount() {
        this.props.getAccounts();
    }

    onLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    handleOnSuccess = (token: string, metadata: unknown) => {
        const plaidData = {
            public_token: token,
            metadata: metadata
        };
        this.props.addAccount(plaidData);
    }

    render() {
        const { user } = this.props.auth;
        const { accounts, accountsLoading } = this.props.plaid;
        let dashboardContent;

        if (accounts === null || accountsLoading) {
            return <p className='center-align'>Loading...</p>;
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
                            <PlaidLinkButton buttonProps={{
                                className:'btn btn-larg waves-effect waves-light hoverable blue accent-3 main-btn'
                            }}
                            plaidLinkProps={{
                                clientName: 'Cygnet Finance',
                                key: '3c16fb36fe08680b6ced44543c6b83',
                                env: 'sandbox',
                                product: ['transactions'],
                                onSuccess: this.handleOnSuccess
                            }}
                            onScriptLoad={() => this.setState({ loaded: true })}>
                                Link Account
                            </PlaidLinkButton>
                        </div>
                        <button onClick={this.onLogoutClick} className='btn btn-large waves-effect waves-light hoverable red accent-3 main-btn'>
                            Logout
                        </button>
                    </div>
                </div>
            );
        }

        // return <div className='container'>{dashboardContent}</div>;
        
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