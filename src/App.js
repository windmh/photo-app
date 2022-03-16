import productApi from "api/productApi";
import SignIn from "features/Auth/page/SignIn";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

//Lazy load - Code splitting
const Photo = React.lazy(() => import("./features/Photo"));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProdutList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };

        const reponse = await productApi.getAll(params);
        console.log(reponse);
        setProductList(reponse.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProdutList();
  }, []);

  //Handle firebase auth change
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("User is not logged in");
          return;
        }

        console.log("Logged in user: ", user.displayName);
        const token = await user.getIdToken();
        console.log("Logged in user token: ", token);
      });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ... </div>}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
