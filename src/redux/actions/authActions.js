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
        dispatch({ type: "SIGN_IN", payload: { uid: userId, role: "user" } });
        history.push("/");
      })
      .catch((error) => {
        var errorMessage = null;
        if (error.code === "auth/user-not-found")
          errorMessage = "User Doesn't Exist Please Check your Mail ID";
        else if ("auth/wrong-password")
          errorMessage = "Invalid Password please check your password";
        else if (error.code === "auth/too-many-requests")
          errorMessage = "Too Many attempts try changing the password";
        else errorMessage = "check your credentials and try again later";

        dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      });
  };

export const signUp =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var userId = userCredential.user.uid;
        firestore.collection("users").doc(userId).set({
          name,
          email,
          role: "user",
          auth: "manual",
        });
        dispatch({ type: "SIGN_UP", payload: { uid: userId, role: "user" } });
        history.push("/");
      })
      .catch((error) => {
        var errorMessage = null;
        if (
          error.code === "auth/email-already-exists" ||
          error.code === "auth/email-already-in-use"
        )
          errorMessage = "User Already exist, try sign in";
        else {
          errorMessage = "check your internet and try again later";
        }

        dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      });
  };
export const signOut = () => {
  auth.signOut();
  localStorage.clear();
  history.replace("/");
  return {
    type: "SIGN_OUT",
  };
};
