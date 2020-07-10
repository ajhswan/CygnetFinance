import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaidLinkButton from 'react-plaid-link-button';
import { connect } from 'react-redux';
import { getTransactions, addAccount, deleteAccount } from '../../../actions/accountActions';
import { logoutUser } from '../../../actions/authActions';
import MaterialTable, { Column } from 'material-table';
import { STATES } from 'mongoose';

interface IAccountsProps {
    accounts: any[],
    user: any,
    plaid: any,
    getTransactions: Function,
    addAccount: Function,
    deleteAccount: Function,
    logoutUser: Function
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

class Accounts extends Component<IAccountsProps> {

    // static propTypes = {
    //     logoutUser: PropTypes.func.isRequired,
    //     getTransactions: PropTypes.func.isRequired,
    //     addAccount: PropTypes.func.isRequired,
    //     deleteAccount: PropTypes.func.isRequired,
    //     accounts: PropTypes.array.isRequired,
    //     plaid: PropTypes.object.isRequired,
    //     user: PropTypes.object.isRequired
    // }

    componentDidMount() {
        const { accounts } = this.props;
        this.props.getTransactions(accounts);
    }

    handleOnSuccess = (token: string , metadata: IPlaidMetadata) => {
        const { accounts } = this.props;
        const plaidData = {
            public_token: token,
            metadata: metadata,
            accounts: accounts
        };

        console.log(plaidData);
        
        this.props.addAccount(plaidData);
    };

    onDeleteClick = (id: unknown) => {
        const { accounts } = this.props;
        const accountData = {
            id: id,
            accounts: accounts
        };

        this.props.deleteAccount(accountData);
    };

    onLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user, accounts } = this.props;
        const { transactions, transactionsLoading } = this.props.plaid;
        console.log(accounts);
        let accountItems = accounts.map(account => (
            <li key={account.item_id} style={{ marginTop: '1rem '}}>
                <button 
                style={{ marginRight: '1rem' }} 
                onClick={this.onDeleteClick.bind(this, account.item_id)}
                className='btn btn-small btn-floating waves-effect waves-light hoverable red accent-3'
                >
                    <i className='material-icons'>delete</i>
                </button>
                <b>{account.institutionName}</b>
            </li>
        ));
        
        type IType = 
            | 'string'
            | 'boolean'
            | 'numeric'
            | 'date'
            | 'datetime'
            | 'time'
            | 'currency';

        type RowData = {
            Account: string,
            Date: string,
            Name: string,
            Amount: string,
            Category: string
        }

        const string: IType = 'string';
        const date: IType = 'date';

    

        const transactionsDays = '30';
        const transactionsColumns = [
            { title: 'Account', field: 'account', type: string },
            { title: 'Date', field: 'date', type: date , defaultSort: 'desc'},
            { title: 'Name', field: 'name', type: string },
            { title: 'Amount', field: 'amount', type: string },
            {title: 'Category', field: 'category', type: string }
        ] as Column<RowData>[];

        let transactionsData: any[] = [];
        transactions.forEach(function(account: any) {
            account.transactions.forEach(function(transaction: any) {
                transactionsData.push({
                    account: account.accountName,
                    date: transaction.date,
                    category: transaction.category[0],
                    name: transaction.name,
                    amount: transaction.amount
                });
            });
        });

        return (
            <div className='row'>
                <div className='col s12'>
                    <button
                    onClick={this.onLogoutClick}
                    className='btn-flat waves-effect'
                    >
                        <i className='material-icons left'>keyboard_backspace</i>
                        Log Out
                    </button>
                    <h4>
                        <b>Welcome</b>
                    </h4>
                    <p className='grey-text text-darken-1'>
                            Hi, {user.name.split(' ')[0]}
                    </p>
                    <h5>
                        <b>Linked Accounts</b>
                    </h5>
                    <p className='grey-text text-darken-1'>
                        Add or remove your bank accounts below
                    </p>
                    <ul>{accountItems}</ul>
                    <PlaidLinkButton
                        buttonProps={{
                            className: 'btn btn-large waves-effect eaves-light hoverable blue accent-3 main-btn'
                        }}
                        plaidLinkProps={{
                            clientName: 'Cygnet Finance',
                            key: '3c16fb36fe08680b6ced44543c6b83',
                            env: 'sandbox',
                            product: ['transactions'],
                            onSuccess: this.handleOnSuccess
                        }}
                        onScriptLoad={() => this.setState({ loaded: true })}
                        >
                            Add Account
                        </PlaidLinkButton>
                        <hr style={{ marginTop: '2rem', opacity: '0.2' }} />
                        <h5>
                            <b>Transactions</b>
                        </h5>
                        {transactionsLoading ? (
                            <p className='grey-text text-darken-1'>Fetching transactions...</p>
                        ) : (
                            <React.Fragment>
                            <p className='grey-text text-darken-1'>
                                You have <b>{transactionsData.length}</b> Linked
                                {accounts.length > 1 ? (
                                    <span> accounts </span>
                                ) : (
                                    <span> account </span>
                                )}
                                from the past {transactionsDays} days
                            </p>
                            <MaterialTable
                            columns={transactionsColumns}
                            data={transactionsData}
                            title='Search Transactions'
                            />
                            </React.Fragment>
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    plaid: state.plaid
});

export default connect(
    mapStateToProps,
    { logoutUser, getTransactions, addAccount, deleteAccount }
)(Accounts);