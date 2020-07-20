import React, { Component } from 'react';
// import { PlaidLink } from 'react-plaid-link';
import PlaidButton from '../PlaidButton'; //Import was to try bring in a functional component, not working
import { connect } from 'react-redux';
import { getTransactions, addAccount, deleteAccount } from '../../../actions/accountActions';
import { logoutUser } from '../../../actions/authActions';
import MaterialTable, { Column } from 'material-table';
import Spinner from '../Spinner';
import FlexWrapper from '../../FlexWrapper';
import ContainerSmall from '../../ContainerSmall';
import ConatinerMedium from '../../ContainerMedium';
import ContainerLarge from '../../ContainerLarge';
import './PlaidButton.css'

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


    componentDidMount() {
        const { accounts } = this.props;
        this.props.getTransactions(accounts);
    }

    onDeleteClick = (id: any) => {
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

        let accountItems = accounts.map(account => (
            <li key={account._id} style={{ marginTop: '1rem '}}>
                <button 
                style={{ marginRight: '1rem' }} 
                onClick={this.onDeleteClick.bind(this, account._id)}
                className='btn btn-lardge btn-floating waves-effect waves-light hoverable red accent-3'
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
                    <FlexWrapper>
                        <ConatinerMedium>
                            Chart here
                        </ConatinerMedium>
                        <ContainerSmall>
                            <h5>
                                <b>Linked Accounts</b>
                            </h5>
                            <p className='grey-text text-darken-1'>
                                Add or remove your bank accounts below
                            </p>
                            <ul>{accountItems}</ul>
                            <PlaidButton label='Add Account'/>
                        </ContainerSmall>
                        <ContainerSmall>
                            KPI here
                        </ContainerSmall>
                    </FlexWrapper>
                    <FlexWrapper>
                        <ContainerLarge>
                            <h5>
                                <b>Transactions</b>
                            </h5>
                            {transactionsLoading ? (
                                <Spinner/>
                            ) : (
                                <React.Fragment key='key'>
                                <p className='grey-text text-darken-1'>
                                    You have <b>{transactionsData.length} </b>
                                    transactions from your
                                    <b> {accounts.length}</b> linked
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
                        </ContainerLarge>
                    </FlexWrapper>
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