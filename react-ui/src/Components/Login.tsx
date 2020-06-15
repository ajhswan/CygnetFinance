import React, { Component } from 'react';
import styled from 'styled-components';
import './Form.css';

interface ILoginProps {

}

interface ILoginState {
    [key: string]: string | object,
    email: string,
    password: string
    errors: {
        email: string,
        password: string
    } 
}

class Login extends Component<ILoginProps, ILoginState> {
    constructor (props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            }
        }

    }
    componentDidMount() {
        $(".form-input").focus(function(){
            $(this).parent().addClass("is-active is-completed");
        });
      
        $(".form-input").focusout(function(){
            if($(this).val() === "")
            $(this).parent().removeClass("is-completed");
            $(this).parent().removeClass("is-active");
        })
    }


    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id as keyof ILoginState;
        const value = e.currentTarget.value as unknown as ILoginState;

        this.setState({ [key]: value });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    render() {
     const { errors } = this.state;
     return (
         <div>
             <ReturnHome>
                <Link href='/'><Icon className='material-icons'>keyboard_backspace</Icon>BACK TO HOME</Link>
                <h4><b>Log In</b> below</h4>
            </ReturnHome>
                <form noValidate onSubmit={this.handleSubmit}>

                    <div className='form-div'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input className='form-input browser-default'
                        onChange={this.handleChange}
                        value={this.state.email}
                        data-error={errors.email}
                        id='email'
                        type='email'
                        />
                    </div>
                    <div className='form-div'>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input className='form-input browser-default'
                        onChange={this.handleChange}
                        value={this.state.password}
                        data-error={errors.password}
                        id='password'
                        type='passwoform'
                        />
                    </div>
                    <div>
                        <SubmitButton type='submit' className='btn btn large hoverable waves-effect waves-light blue accent-3'>
                            Login
                        </SubmitButton>
                    </div>

                </form>
         </div>
        )
    }
}

export default Login;

const SubmitButton = styled.button`
width: 150px;
border-radius: 3px;
letter-spacing: 1.5px;
margin-top: 1rem;`;

const Icon = styled.i`
position: relative;
top: 50%;
left: 0;
font-size: 1.1rem;`;

const Link = styled.a`
color: ${props => props.color ? '#2196F3' : '#757575'};
font-size: 1.05rem;`;

const ReturnHome = styled.div`
margin-top: 5px;`;

