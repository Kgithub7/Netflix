import { FirebaseError, initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "netflix-8be9d.firebaseapp.com",
  projectId: "netflix-8be9d",
  storageBucket: "netflix-8be9d.firebasestorage.app",
  messagingSenderId: "845827750429",
  appId: "1:845827750429:web:291e1de3a7d627e20f64f4",
  measurementId: "G-RTF3TD59H5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> => {
  if (!name.trim()) return { success: false, error: "Name is required." };
  else
    try {
      const response: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = response.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      return { success: true };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return { success: false, error: mapAuthError(error.code) };
      } else {
        return { success: false, error: mapAuthError() };
      }
    }
};

const logIn = async (
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      return { success: false, error: mapAuthError(error.code) };
    } else {
      return { success: false, error: mapAuthError() };
    }
  }
};

const logOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, error: mapAuthError(error.code) };
    } else {
      return { success: false, error: mapAuthError() };
    }
  }
};

const mapAuthError = (errorCode?: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";
    case "auth/invalid-credential":
      return "Invalid email or password. Please try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export { auth, db, signUp, logIn, logOut };
