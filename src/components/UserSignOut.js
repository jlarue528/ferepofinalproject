import { useEffect } from 'react';
import { Redirect } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default(props) => {
    
    /*
        * This function will sign a user out
        * and will redirect them to the index page -
        * the signout method is utilized from the context.js
        * file.
    */
    useEffect(() => {
        props.context.actions.signOut();
    }, [props.context.actions])
 
    return <Redirect to="/"/>
}
