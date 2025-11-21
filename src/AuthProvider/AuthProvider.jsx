
import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import app from "./firebase.config";

// Create context
export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign up
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout
    const logOut = () => {
        return signOut(auth);
    };

    // Update Profile
    const updateUserProfile = async (displayName, photoURL) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: displayName,
                photoURL: photoURL
            });

            // Force update the user state immediately
            setUser(prevUser => ({
                ...prevUser,
                displayName: displayName,
                photoURL: photoURL
            }));

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };

    // Send Password Reset Email
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Track user state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        logOut,
        updateUserProfile,
        resetPassword
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
