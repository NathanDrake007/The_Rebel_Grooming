import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LaunchPage from "./pages/LaunchPage";
import { Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import ScrollToTop from "./components/ScrollToTop.";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import CartPage from "./pages/CartPage";
import history from "./helper/history";
import "./app.css";
import { auth } from "./helper/firebase";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { connect } from "react-redux";
import { signOut, setUser } from "./redux/actions/authActions";
function App(props) {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      console.log("This will run after 5 second!");
      setRedirect(true);
    }, 5000);

    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        props.setUser(userAuth.uid);
      }
    });
    // return () => {
    //   authListener();
    // };
  }, [props]);

  return (
    <div className="app">
      <Router history={history}>
        <NavBar />
        <ScrollToTop>
          <Switch>
            <Route
              exact
              path="/"
              component={redirect ? HomePage : LaunchPage}
            />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/recovery" component={ResetPasswordPage} />
            <Route path="/cart" component={CartPage} />
          </Switch>
        </ScrollToTop>
        <Footer />
      </Router>
    </div>
  );
}

export default connect(null, { signOut, setUser })(App);
