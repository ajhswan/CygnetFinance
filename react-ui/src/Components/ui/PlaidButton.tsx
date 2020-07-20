import React, { Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import { addAccount } from '../../actions/accountActions';
import { connect } from 'react-redux';

interface IPlaidButtonProps {
    accounts?: any[],
    user?: any,
    plaid?: any,
    getTransactions?: Function,
    addAccount?: Function | any,
    deleteAccount?: Function,
    logoutUser?: Function,
    label: string
}

interface PlaidInstitution {
    name: string;
    type: string;
}

interface PlaidAccount {
    id: string;
    name: string;
}
interface IPlaidMetadata {
    institution?: PlaidInstitution;
    account?: PlaidAccount;
    account_id?: string;
}

class PlaidButton extends Component<IPlaidButtonProps> {
    
    handleOnSuccess = (token: string , metadata: IPlaidMetadata) => {
        const { accounts } = this.props;
        const plaidData = {
            public_token: token,
            metadata: metadata,
            accounts: accounts
        };
        
        this.props.addAccount(plaidData);
    };

    render() {
        return (
        <PlaidLink
            className='btn btn-large waves-effect waves-light hoverable blue accent-3 main-btn'
            clientName='Cygnet Finance'
            publicKey='3c16fb36fe08680b6ced44543c6b83'
            env='development'
            countryCodes={['GB']}
            product={['auth','transactions']}
            style={{border: 'none'}}
            onSuccess={this.handleOnSuccess}
            onLoad={() => this.setState({ loaded: true })}
            >
            {this.props.label}
        </PlaidLink>
        )
    }
};

const mapStateToProps = (state: any) => ({
    plaid:state.plaid

});

export default connect(
    mapStateToProps,
    { addAccount }
) (PlaidButton)