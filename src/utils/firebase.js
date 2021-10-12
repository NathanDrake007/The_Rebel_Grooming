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
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async () =>
	await auth.signInWithPopup(GoogleProvider).then((val) => {
		if (val.additionalUserInfo.isNewUser) {
			const user = val.user;
			firestore.collection("users").doc(user.uid).set({
				name: user.displayName,
				email: user.email,
				role: "user",
				auth: "google",
			});
		}
	});

export const getAllOrders = async () => {
	var temp = [];
	await firestore
		.collection("orders")
		.get()
		.then((snapShot) =>
			snapShot.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }))
		);
	return temp;
};

export const getAllUsers = async () => {
	var temp = [];
	await firestore
		.collection("users")
		.get()
		.then((snapShot) =>
			snapShot.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }))
		);
	return temp;
};

export const addCoupon = async (name, discount) =>
	await firestore.collection("coupon").doc(name).set({ discount });

export const addBlog = async (blog) => {
	await firestore.collection("Blogs").add(blog);
};
