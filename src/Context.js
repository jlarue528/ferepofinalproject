import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: null,
        password: " "
    }

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const { authenticatedUser } = this.state;

        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }

    /*
        * This function handles functionality
        * for signing a user in. It will sign a user in
        * and update the state with the user data & password.
    */
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUserData(emailAddress, password);
        user.password = password;

        if(user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                    password: password
                };
            });
        }
        return(user);
    }
    
    /*
        * This function handles functionality
        * for signing out a user. It will update the 
        * authenticatedUser state to null, which means
        * the user is not signed in. 
    */
    signOut = async () => {
        this.setState(() => {
            return {
                authenticatedUser: null
            }
        });
    }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}