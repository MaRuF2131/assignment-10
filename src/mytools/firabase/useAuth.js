import { useEffect, useState } from "react";
import {
  auth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  googleProvider,
  signOut,
  onAuthStateChanged,
} from "./firebase.init";
import { updateProfile } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  // 🔹 Helper to format user data
  const formatUser = (firebaseUser) => {
    if (!firebaseUser) return null;
    const { displayName, email, uid, photoURL } = firebaseUser;
    return { displayName, email, uid, photoURL };
  };

  // 🔹 Google Login
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(formatUser(result.user));

    } catch (error) {
      console.error("Google login failed:", error.message);
      setUser(null);
      throw error
    }

  };

  // 🔹 Email/Password Login
  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(formatUser(result.user));
    } catch (error) {
      console.error("Email login failed:", error.message);
      setUser(null);
      throw error
    }
  };

  // 🔹 Register with Email
  const registerWithEmail = async (email, password, displayName,photoURL) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName,photoURL});
      setUser(formatUser({ ...result.user, displayName,photoURL }));
    } catch (error) {
      console.error("Registration failed:", error.message);
      setUser(null);
      throw error
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
      throw error
    }
  };

  // 🔹 On Auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(formatUser(firebaseUser));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    theme,
    setTheme,
    user,
    loading,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
};

export default useAuth;
