import { auth } from "../../utils/firebase";
import history from "../../utils/history";

export const setUser = (userId) => {
  return {
    type: "SET_USER",
    payload: userId,
  };
};
export const signIn =
  ({ email, password }) =>
  (dispatch, getState) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var userId = userCredential.user;
        dispatch({ type: "SIGN_IN", payload: userId });
        history.push("/");
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
        history.push("/");
      })
      .catch((error) => {
        var errorMessage = error.message;
        dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      });
  };
export const signOut = () => {
  alert("signed out successfully");
  return {
    type: "SIGN_OUT",
  };
};
