import React, { Component } from 'react';
import styled from 'styled-components';
import './Form.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import classnames from 'classnames';

interface ILoginProps {
    history: any,
    loginUser: Function,
    auth: any
}

interface ILoginState {
    [key: string]: string | object,
    email: string,
    password: string
    errors: {
        email: string,
        password: string,
        emailnotfound: string,
        passwordincorrect: string
    } 
}

class Login extends Component<ILoginProps, ILoginState> {

    // static propTypes = {
    //     loginUser: PropTypes.func.isRequired,
    //     auth: PropTypes.object.isRequired,
    //     errors: PropTypes.object.isRequired 
    // }

    constructor (props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: '',
                emailnotfound: '',
                passwordincorrect:''
            }
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({
                 errors: nextProps.errors
                });
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
        
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('dashboard');
        }
    }


    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id as keyof ILoginState;
        const value = e.currentTarget.value as unknown as ILoginState;

        this.setState({ [key]: value });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
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
                        <span className='red-text'>
                            {errors.email}
                            {errors.emailnotfound}
                        </span>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input className= { classnames('form-input browser-default', {invalid: errors.email || errors.emailnotfound}) }
                        onChange={this.handleChange}
                        value={this.state.email}
                        data-error={errors.email}
                        id='email'
                        type='email'
                        />
                    </div>
                    <div className='form-div'>
                    <   span className='red-text'>
                            {errors.password}
                            {errors.passwordincorrect}
                        </span>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input className={classnames('form-input browser-default', {invalid: errors.password || errors.passwordincorrect}) }
                        onChange={this.handleChange}
                        value={this.state.password}
                        data-error={errors.password}
                        id='password'
                        type='password'
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

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { loginUser }    
)(Login);

const SubmitButton = styled.button`
width: 150px;
border-radius: 3px;
letter-spacing: 1.5px;
margin-top: 2rem;
margin-bottom: 2rem;
margin-left: 1rem;`;

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

