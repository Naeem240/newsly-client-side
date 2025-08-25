import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // ✅ plain axios
import { AuthContext } from './AuthContext';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);

    // ✅ Use plain axios to get user info
    const { data: users = {} } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`https://b11a12-server-side-naeem240.vercel.app/users?email=${user.email}`);
            return res.data;
        },
    });

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            // setLoading(true);
            setUser(currentUser);
            //console.log('user in the auth state change', currentUser);
            setLoading(false);
        });

        return () => {
            unSubscribe();
        };
    }, []);

    useEffect(() => {
        const checkPremiumExpiry = async () => {
            if (users?.premiumTaken) {
                const expiryDate = new Date(users.premiumTaken);
                const now = new Date();

                if (expiryDate < now) {
                    //console.log("Premium expired! Resetting premiumTaken to null");                    
                    await axios.patch(`https://b11a12-server-side-naeem240.vercel.app/users/${users.email}/premium`, { premiumTaken: null });
                    setIsPremium(false);
                }
            }
        };

        if (users?.email) {
            checkPremiumExpiry();
        }
    }, [users]);

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut,
        isPremium,
        setIsPremium,
        theme, 
        setTheme
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
