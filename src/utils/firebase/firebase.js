import { initializeApp } from 'firebase/app';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithPopup,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyB7P13I7LcayjBQt20PyCpQ5_TJfeN-xHc',
	authDomain: 'crwn-clothing-53bfc.firebaseapp.com',
	projectId: 'crwn-clothing-53bfc',
	storageBucket: 'crwn-clothing-53bfc.appspot.com',
	messagingSenderId: '743977364466',
	appId: '1:743977364466:web:bb52b012f64de17bf3596b',
};

const firebaseApp = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();

GoogleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, GoogleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithGoogleRedirect(auth, GoogleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	//if user data does not exist
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log(error.message);
		}
		return userDocRef;
	}
	//if user data exists

	//return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithUserEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser =async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
	onAuthStateChanged(auth,callback)
};