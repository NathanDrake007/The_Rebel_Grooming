import React, { Component } from "react";
import HomePage from "./pages/HomePage";
import LaunchPage from "./pages/LaunchPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import ScrollToTop from "./components/ScrollToTop.";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";

import "./app.css";
import { auth } from "./helper/firebase";
import ResetPasswordPage from "./pages/ResetPasswordPage";
const initalState = {
  redirect: false,
  currentUser: null,
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initalState,
    };
  }
  authListener = null;
  componentDidMount() {
    setTimeout(() => {
      console.log("This will run after 5 second!");
      this.setState({
        redirect: true,
      });
    }, 5000);

    this.authListener = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        this.setState({
          ...initalState,
        });
      }

      this.setState({
        currentUser: userAuth,
      });
    });
  }
  componentWillUnmount() {
    this.authListener();
  }
  render() {
    return (
      <div className="app">
        <Router>
          <NavBar />
          <ScrollToTop>
            <Switch>
              <Route
                exact
                path="/"
                component={this.state.redirect ? HomePage : LaunchPage}
              />
              <Route path="/product/:id" component={ProductPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/signin" component={SignInPage} />
              <Route path="/recovery" component={ResetPasswordPage} />
            </Switch>
          </ScrollToTop>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
