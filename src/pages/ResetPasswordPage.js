import React, { useState } from "react";
import { auth } from "../helper/firebase";
function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    const config = {
      url: "http://localhost:3000/signin",
    };
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        console.log("reset link sent to your mail");
      })
      .catch(() => {
        console.log("Email not found. Please try again.");
      });
  };
  return (
    <div className="resetPage">
      <div class="container border border-4 border-dark rounded my-5 w-25">
        <div class="text-center">
          <h2>Sign In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="email...."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-danger my-2 text-center">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
