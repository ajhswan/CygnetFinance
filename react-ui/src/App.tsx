import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import TopHeader from './Components/TopHeader';
import Landing from './Components/Landing';
import styled from 'styled-components';
import Register from './Components/Register';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import Dashboard from './Components/ui/Dashboard/Dashboard';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded: any = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now();
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser() as any);
        
        window.location.href = './login';
    }

}

class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <MainApp className='App'>
                    <TopHeader />
                    <StyledDiv >
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Switch>
                            <PrivateRoute exact path='/dashboard' component={Dashboard} />
                        </Switch>
                    </StyledDiv>
                    </MainApp>
                </Router>
            </Provider>
        );
    }
}

export default App;

const MainApp = styled.div`
overflow: auto;
width: 100%;
margin: 0 auto;
// border: 2px dotted red;`;

const StyledDiv = styled.div`
overflow: auto;
width: 600px;
margin: 0 auto;
// border: 2px dotted red;`;

