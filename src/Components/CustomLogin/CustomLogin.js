import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';


firebase.initializeApp(firebaseConfig);

const CustomLogin = () => {
    return (
        <div>
            <h1>Our user authentication</h1>
        </div>
    );
};

export default CustomLogin;