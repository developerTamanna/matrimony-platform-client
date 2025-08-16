import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {setHeader} from '../../hooks/useAxiosSecure'
import { AuthContext } from './AuthContext';

// Google Provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [name, setname] = useState(null);
  const asx = useAxiosSecure();
  const callbackend = async (data, data1) => {
    try {
      console.log('Callback user data:', data);
      if (!data || !data1) return null;
      const response = await asx.post('/api/auth/login', {
        email: data,
        name: data1,
      });
      console.log('Callback response:', response.data);

      return response.data; // ✅ return the data here
    } catch (error) {
      console.error('Callback error:', error);
      throw error; // ⛔ let the caller handle the error
    }
  };

  // Create account
  const createUser = async (email, password) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  };

  // Sign in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    if (!auth.currentUser) return;
    setname(name);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Observe user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      const role = await callbackend(
        currentUser?.email,
        name || currentUser?.displayName
      );
      console.log(role);
      if (!role){ setUser(null);  setLoading(false)  ;return}
      setUser({ ...currentUser, role });
     /*  setLoading(false); */
      //today token related work
      //next
    });
    return () => unsubscribe(); // cleanup
  }, [name]);

  useEffect(() => {
  let removeInterceptor;

  if (user) {
    removeInterceptor = setHeader(user); // setup header
    setLoading(false);
  }

  return () => {
     if (removeInterceptor) removeInterceptor(); // cleanup
     setLoading(false);
  };
  }, [user]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logout,
    setUser,
    setLoading,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
