import { auth } from "../../utils/firebase";
import { firestore } from "../../utils/firebase";
import history from "../../utils/history";

export const setUser = (userId) => {
  return {
    type: "SET_USER",
    payload: userId,
  };
};
export const signIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    await auth
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
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        var userId = userCredential.user;
        await firestore.collection("users").doc(userId).set({
          name,
          email,
          role: "user",
          auth: "manual",
        });
        dispatch({ type: "SIGN_UP", payload: userId });
        history.push("/");
      })
      .catch((error) => {
        var errorMessage = error.message;
        dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      });
  };
export const signOut = () => {
  auth.signOut();
  return {
    type: "SIGN_OUT",
  };
};
