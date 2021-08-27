import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ScrollToTop from "./utils/ScrollToTop";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import "./app.css";

//utils
import { auth } from "./utils/firebase";
import history from "./utils/history";

//redux
import { connect } from "react-redux";
import { signOut, setUser } from "./redux/actions/authActions";

//layout
import MainLayout from "./layouts/MainLayout";

//hoc

// stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { publishableKey } from "./utils/stripeConfig";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";

const stripePromise = loadStripe(publishableKey);

function App(props) {
  useEffect(() => {
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
        <ScrollToTop>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <MainLayout>
                  <HomePage />
                </MainLayout>
              )}
            />
            <Route path="/product/:id" component={ProductPage} />
            <Route
              path="/signup"
              render={() => (
                <MainLayout>
                  <SignupPage />
                </MainLayout>
              )}
            />
            <Route
              path="/about"
              render={() => (
                <MainLayout>
                  <AboutPage />
                </MainLayout>
              )}
            />
            <Route path="/viewBlog/:id" component={BlogDetailPage} />
            <Route
              path="/blogs"
              render={() => (
                <MainLayout>
                  <BlogPage />
                </MainLayout>
              )}
            />
            <Route
              path="/signin"
              render={() => (
                <MainLayout>
                  <SignInPage />
                </MainLayout>
              )}
            />
            <Route
              path="/recovery"
              render={() => (
                <MainLayout>
                  <ResetPasswordPage />
                </MainLayout>
              )}
            />
            <Route
              path="/cart"
              render={() => (
                <MainLayout>
                  <CartPage />
                </MainLayout>
              )}
            />
            <Route
              path="/checkout"
              render={() => (
                <Elements stripe={stripePromise}>
                  <MainLayout>
                    <CheckoutPage />
                  </MainLayout>
                </Elements>
              )}
            />
            <Route
              path="/orders"
              render={() => (
                <Elements stripe={stripePromise}>
                  <MainLayout>
                    <OrderPage />
                  </MainLayout>
                </Elements>
              )}
            />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default connect(null, { signOut, setUser })(App);
