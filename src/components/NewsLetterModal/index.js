import React, { useState } from "react";
import modal from "../../assets/pictures/modal.jpeg";
import DataErrorPage from "../../pages/DataErrorPage";
import { firestore } from "../../utils/firebase";
function NewsLetterModal(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setEmailError(true);
    }
    if (emailError) setEmailError(false);
    await firestore
      .collection("newsletter")
      .add({ email })
      .then(() => {
        setOpen(true);
        setTimeout(() => props.setOpenNews(false), 6000);
      })
      .catch(() => setHasError(true));
  };
  const renderSuccess = () => {
    return (
      <div className="container bg-white text-center color-1 p-5">
        <h4>Thank you for Subscribing</h4>
        <h5>Your Coupon Code</h5>
        <h1>REBEL20</h1>
        <button
          type="button"
          className="button-1 mx-0"
          onClick={() => props.setOpenNews(false)}
        >
          Close
        </button>
      </div>
    );
  };
  const renderModal = () => {
    return (
      <div
        className="modal fade show d-block"
        id="newsLetter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="newsLetterLabel"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            {open ? (
              renderSuccess()
            ) : (
              <>
                <div
                  className="container d-none d-lg-block"
                  style={{
                    backgroundImage: `url(${modal})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="d-flex flex-column justify-content-center text-center w-50 p-5">
                    <h1>Welcome Aboard</h1>
                    <h3 className="text-secondary">
                      Sign up and save 20% on your first order
                    </h3>
                    <h3 className="text-secondary">
                      Enter your email to redeem
                    </h3>
                    <form
                      className="d-flex flex-column"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="email"
                        className="form-control fs-5"
                        placeholder="Enter Details"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError ? (
                        <p className="text-danger">Invalid Email</p>
                      ) : null}
                      <button type="submit" className="button-1 mx-0">
                        Subscribe
                      </button>
                      <button
                        type="button"
                        className="button-1 mx-0"
                        onClick={() => props.setOpenNews(false)}
                      >
                        I don't want the offer.
                      </button>
                    </form>
                  </div>
                </div>
                <div
                  className="container d-block d-lg-none"
                  style={{
                    backgroundImage: `url(${modal})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="d-flex flex-column justify-content-center text-center p-5 me-5">
                    <h1>Welcome Aboard</h1>
                    <h3 className="text-secondary">
                      Sign up and save 20% on your first order
                    </h3>
                    <h3 className="text-secondary">
                      Enter your email to redeem
                    </h3>
                    <form
                      className="d-flex flex-column"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="email"
                        className="form-control fs-5"
                        placeholder="Enter Details"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError ? (
                        <p className="text-danger">Invalid Email</p>
                      ) : null}
                      <button type="submit" className="button-1 mx-0">
                        Subscribe
                      </button>
                      <button
                        type="button"
                        className="button-1 mx-0"
                        onClick={() => props.setOpenNews(false)}
                      >
                        I don't want the offer.
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  return hasError ? <DataErrorPage /> : renderModal();
}

export default NewsLetterModal;
