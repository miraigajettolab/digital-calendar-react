import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import * as firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAM0KhS0riyYIRWstjNkqlIG4Soam3GHXk",
    authDomain: "digitalcalendarhh.firebaseapp.com",
    databaseURL: "https://digitalcalendarhh.firebaseio.com",
    projectId: "digitalcalendarhh",
    storageBucket: "digitalcalendarhh.appspot.com",
    messagingSenderId: "348199588219",
    appId: "1:348199588219:web:4774ccfff0dc4ef8b06dde",
    measurementId: "G-SY58H60XCF"
};
firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById("root"));