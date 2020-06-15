import React, { Component } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    position: relative;
    width 100%;
    top: 2rem;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #2196F3;
    text-align: center;
    padding: 5px;
    color: #ffffff;
    font-size: 2rem;
    font-weight: bold;
    border-radius: 5px 5px 0 0;
`
const Icon = styled.i`
margin-right: 5px;
`

const Link = styled.a`
color: #ffffff;`


class TopHeader extends Component {
    render() {
        return (
            <StyledHeader>
                <Link href='/'><Icon className='material-icons'>all_inclusive</Icon>CYGNET FINANCE</Link>
            </StyledHeader>
        )
    }
}

export default TopHeader;



