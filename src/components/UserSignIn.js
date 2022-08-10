import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import Form from './Form';

export default class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        errors: [],
    };

    /*
        * This function handles submit 
        * functionality for the sign in page.
        * After successful submission of credentials
        * the user will be redirected to courses page.
    */
    submit = () => {
        const { context } = this.props;
        const {
            emailAddress,
            password,
        } = this.state

        context.actions.signIn(emailAddress, password)
            .then(user => {
                if(user === null) {
                    this.setState(() => {
                        return{ errors: ['Sign-in was unsuccessful']}
                    });
                } else {
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error')
            })
    }

    /*
        * This function handles functionality
        * for the cancel button - a user will
        * be redirected to the courses page if 
        * they utilize cancel.
    */
    cancel = () => {
        this.props.history.push("/");
    }

    /*
        * This function handles changes to the
        * fields on the page. When there is a change
        * to a field the course state will update
        * with the new user defined values. 
    */
    handleChange = (e) => {
        const name = e.target.name;
        const value= e.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }

    render() {
        const {
            emailAddress,
            password,
            errors,
          } = this.state;
            
          return (
            <div className="form--centered">
            <h2>Sign In</h2>
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Sign In"
                elements={() => (
                    <React.Fragment>
                        <label htmlFor="emailAddress">
                            Email Address
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="text"
                                onChange={this.handleChange}
                                value={emailAddress} />
                            </label>
                        <label htmlFor="password">
                            Password
                            <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={this.handleChange} 
                            value={password} />
                        </label>
                    </React.Fragment>
                )}/>
            <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>
    </div>
    )};
};
