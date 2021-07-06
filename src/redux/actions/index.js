import { auth } from "../../helper/firebase";
export const signIn =
  ({ email, password }) =>
  (dispatch, getState) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var userId = userCredential.user;
        dispatch({ type: "SIGN_IN", payload: userId });
      })
      .catch((error) => {
        var errorMessage = error.message;
        dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      });
  };

export const signUp =
  ({ email, password }) =>
  (dispatch, getState) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var userId = userCredential.user;
        dispatch({ type: "SIGN_UP", payload: userId });
      })
      .catch((error) => {
        var errorMessage = error.message;
        dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      });
  };
export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const placeOrder = (payload) => (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER", payload });
};
