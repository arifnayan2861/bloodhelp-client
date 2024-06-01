import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";

import auth from "../../firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            setUser(currentUser);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      } else {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/logout`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            setUser(null);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    loginUser,
    logoutUser,
    loginWithGoogle,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
