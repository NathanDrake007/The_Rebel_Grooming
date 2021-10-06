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
import PageError from "./pages/PageError";
import "./app.css";

//utils
import { auth, firestore } from "./utils/firebase";
import history from "./utils/history";

//redux
import { connect } from "react-redux";
import { signOut, setUser } from "./redux/actions/authActions";

//layout
import MainLayout from "./layouts/MainLayout";

import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AdminPage from "./pages/AdminPage";
import InfluncerPage from "./pages/InfluncerPage";

function App(props) {
	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				firestore
					.collection("users")
					.doc(userAuth.uid)
					.get()
					.then((e) =>
						props.setUser({ uid: userAuth.uid, role: e.data().role })
					);
			}
		});
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
							path="/admin-easwar2001"
							render={() => (
								<MainLayout>
									<AdminPage />
								</MainLayout>
							)}
						/>
						<Route
							path="/influencer"
							render={() => (
								<MainLayout>
									<InfluncerPage />
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
								<MainLayout>
									<CheckoutPage />
								</MainLayout>
							)}
						/>
						<Route
							path="/orders"
							render={() => (
								<MainLayout>
									<OrderPage />
								</MainLayout>
							)}
						/>
						<Route component={PageError} />
					</Switch>
				</ScrollToTop>
			</Router>
		</div>
	);
}

export default connect(null, { signOut, setUser })(App);
