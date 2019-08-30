import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <LoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleSubmit(event) {
        event.preventDefault();   

                const loginRequest = this.state;
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                    
                }).catch(error => {
                    if(error.status === 401) {
                        // notification.error({
                        //     message: 'Polling App',
                        //     description: 'Your Username or Password is incorrect. Please try again!'
                        // });                    
                    } else {
                        // notification.error({
                        //     message: 'Polling App',
                        //     description: error.message || 'Sorry! Something went wrong. Please try again!'
                        // });                                            
                    }
                });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormGroup>
                    {/* {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })( */}
                    <Input 
                        bsSize="large"
                        name="usernameOrEmail" 
                        value={this.state.usernameOrEmail}
                        onChange={this.handleChange}
                        placeholder="Username or Email" />    
                    {/* )} */}
                </FormGroup>
                <FormGroup>
                {/* {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })( */}
                    <Input 
                        bsSize="large"
                        name="password" 
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Password"  />                        
                {/* )} */}
                </FormGroup>
                <FormGroup>
                    <Button type="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormGroup>
            </Form>
        );
    }
}


export default Login;