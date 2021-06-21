import React, { useState, useEffect } from "react";
import HomePage from "./presentation/pages/HomePage";
import LaunchPage from "./presentation/pages/LaunchPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./presentation/components/NavBar";
import Footer from "./presentation/components/Footer";

import "./app.css";
import ProductPage from "./presentation/pages/ProductPage";

function App() {
  const [redirect, setRedirect] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 5 second!");
      setRedirect(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={redirect ? HomePage : LaunchPage} />
          <Route path="/product" component={ProductPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
