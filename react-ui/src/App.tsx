import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopHeader from './Components/TopHeader';
import Landing from './Components/Landing';
import styled from 'styled-components';
import Register from './Components/Register';
import Login from './Components/Login';

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

class App extends Component {
    render(){
        return (
            <Router>
                <MainApp className='App'>
                <TopHeader />
                <StyledDiv >
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                </StyledDiv>
                </MainApp>
            </Router>
        );
    }
}

export default App;