import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";

SignIn.propTypes = {};

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "redirect",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: "/photos",
};

function SignIn(props) {
  return (
    <div>
      <div className="text-center">
        <h2>Login Form</h2>

        <p>or login with social account</p>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignIn;
