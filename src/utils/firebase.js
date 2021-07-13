import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAfx9hIgOdcvjFWsA9jcSf4fD4oALqA2M4",
  authDomain: "rebel-grooming.firebaseapp.com",
  projectId: "rebel-grooming",
  storageBucket: "rebel-grooming.appspot.com",
  messagingSenderId: "609365376860",
  appId: "1:609365376860:web:636e188ed249087bb78b99",
  measurementId: "G-E7PS57N8SV",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapShots: true });

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    const userRoles = ["user"];

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      // console.log(err);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
