import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './ui/Button';

class Landing extends Component {
    render() {
        return (
            <Wrapper>
                <Blurb>A <Bold>Finance App</Bold> for managing your personal finances</Blurb>
                <Buttons>
                    <RegisterButton href='/register' label='Register'></RegisterButton>
                    <LoginButton href='/login' label='Login'></LoginButton>
                </Buttons>
            </Wrapper>

        )
    }
}

export default Landing;

const RegisterButton = styled(Button)`
background-color: #2196f3;
`;

const LoginButton = styled(Button)`
background-color: #ffffff;
color: #212121;
:hover {
    background-color: #ffffff;
} 
`;
const Wrapper = styled.div`
    color: #212121;
`;
const Blurb = styled.h1`
    font-size: 2rem;
    text-align: center;
`;
const Bold = styled.span`
    color: #1976d2;
    font-weight: bold;
`;
const Buttons = styled.div`
    display: flex;
    justify-content: center;
`;
