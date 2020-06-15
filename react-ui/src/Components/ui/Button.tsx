import React, { Component } from 'react';
import styled from 'styled-components';

interface IButtonProps {
    className?: string,
    label?: string,
    href?: string
}

function Button({className,href, label }: IButtonProps) {
        return (
            <div>
            <StyledButton as='a' href={href} className={className + ' ' + 'btn btn-large hoverable'} >{label}</StyledButton>
            </div>
        )
    }

export default Button

const StyledButton = styled.button`
width: 140px;
border-radius: 3px;
letter-spacing: 1.5px;
margin: 10px;
&:hover {
    background-color: #2196F3;
}

&:active {
    background-color: #bbdefb;
}
`