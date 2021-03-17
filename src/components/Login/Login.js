import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInuser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var { displayName, email } = result.user;
                const signedInUser = {
                    name: displayName,
                    email: email
                }
                setLoggedInuser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <Button variant="contained" color="primary" onClick={handleGoogleSignIn}>
                Google signin
            </Button>
        </div>
    );
};

export default Login;