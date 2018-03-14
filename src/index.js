import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase/app';

let config = {
    apiKey: "AIzaSyCO_iboqcIFCD7PGy5EtoeaGuD5p4vafik",
    authDomain: "info-343-final-e0472.firebaseapp.com",
    databaseURL: "https://info-343-final-e0472.firebaseio.com",
    projectId: "info-343-final-e0472",
    storageBucket: "info-343-final-e0472.appspot.com",
    messagingSenderId: "752525806301"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
