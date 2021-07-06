import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../redux/actions";
import { Link } from "react-router-dom";
import "./css/signin_page.css";
class SignUpPage extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
    console.log(this.state);
  };
  render() {
    return (
      <div className="signInPage">
        <div class="container border border-4 border-dark rounded my-5 w-25">
          <div class="text-center">
            <h2>Sign Up</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-2">
              <label for="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="email...."
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-2">
              <label for="password" className="form-label">
                password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="password....."
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-2">
              <label for="confirmPassword" className="form-label">
                password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="re-enter password....."
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-danger mt-2 text-center">
              Submit
            </button>
          </form>
          {this.props.authError ? (
            <p className="text-danger">{this.props.authError}</p>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { authError: state.auth.authError };
};
export default connect(mapStateToProps, { signUp })(SignUpPage);
