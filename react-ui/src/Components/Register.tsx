import React, { Component } from 'react';
import styled from 'styled-components';
import './Form.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import classnames from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router-dom';


interface IRegisterProps {
    color: string,
    registerUser: Function,
    history: any,
    auth: any  
}

interface IRegisterState {
    [key: string]: string | object,
    name: string,
    email: string,
    password: string,
    password2: string,
    errors: {
        name: string,
        email: string,
        password: string,
        password2: string
    },
}


class Register extends Component<IRegisterProps & RouteComponentProps, IRegisterState> {

    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
    
    }

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {
                name: '',
                email: '',
                password: '',
                password2: ''
            }
            
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
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
              this.props.history.push('/dashboard');
          }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id as keyof IRegisterState;
        const value = e.currentTarget.value as unknown as IRegisterState;

        this.setState({ [key]: value });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
                <div>
                    <ReturnHome>
                        <Link href='/'><Icon className='material-icons'>keyboard_backspace</Icon>BACK TO HOME</Link>
                        <h4><b>Register</b> below</h4>
                        <p>Already have an account? <Link color="true" href='/login'>Log In</Link></p>
                    </ReturnHome>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <div className='form-div'>
                            <label className='form-label' htmlFor='name'>Name</label>
                            <span className='red-text'>{errors.name}</span>
                            <input className={ classnames('form-input browser-default', {invalid: errors.name}) }
                            onChange={this.handleChange}
                            value={this.state.name}
                            data-error={errors.name}
                            id='name'
                            type='text'
                            />
                        </div>
                        <div className='form-div'>
                            <label className='form-label' htmlFor='email'>Email</label>
                            <span className='red-text'>{errors.email}</span>
                            <input className={ classnames('form-input browser-default', {invalid: errors.email}) }
                            onChange={this.handleChange}
                            value={this.state.email}
                            data-error={errors.email}
                            id='email'
                            type='email'
                            />
                        </div>
                        <div className='form-div'>
                            <label className='form-label' htmlFor='password'>Password</label>
                            <span className='red-text'>{errors.password}</span>
                            <input className={ classnames('form-input browser-default',{invalid: errors.password}) }
                            onChange={this.handleChange}
                            value={this.state.password}
                            data-error={errors.password}
                            id='password'
                            type='passwoform'
                            />
                        </div>
                        <div className='form-div'>
                            <label className='form-label' htmlFor='password2'>Confirm Password</label>
                            <span className='red-text'>{errors.password2}</span>
                            <input className= { classnames('form-input browser-default', {invalid: errors.password2}) }
                            onChange={this.handleChange}
                            value={this.state.password2}
                            data-error={errors.password2}
                            id='password2'
                            type='password'
                            />
                        </div>
                        <div>
                         <SubmitButton type='submit' className='btn btn large hoverable waves-effect waves-light blue accent-3'>
                             Sign up
                         </SubmitButton>
                        </div>

                    </form>
                </div>
        );
    };
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(
    mapStateToProps,
    { registerUser }
    ) (withRouter(Register));

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



