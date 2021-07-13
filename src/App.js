import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import LaunchPage from "./pages/LaunchPage";
import ProductPage from "./pages/ProductPage";
import ScrollToTop from "./utils/ScrollToTop";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
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

const stripePromise = loadStripe(publishableKey);

function App(props) {
  const [redirect, setRedirect] = useState(false);
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
              render={() =>
                redirect ? (
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                ) : (
                  <LaunchPage setRedirect={setRedirect} />
                )
              }
            />
            <Route
              path="/product/:id"
              component={ProductPage}
              render={() => (
                <MainLayout>
                  <ProductPage />
                </MainLayout>
              )}
            />
            <Route
              path="/signup"
              render={() => (
                <MainLayout>
                  <SignupPage />
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
                    <OrdersPage />
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
