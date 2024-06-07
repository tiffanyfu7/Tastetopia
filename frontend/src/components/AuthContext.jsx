import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    const saveUserToLocalStorage = (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const clearUserFromLocalStorage = () => {
        localStorage.removeItem('currentUser');
    };

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                saveUserToLocalStorage(userCredential.user);
                setCurrentUser(userCredential.user);
                return userCredential.user;
            });
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                saveUserToLocalStorage(userCredential.user);
                setCurrentUser(userCredential.user);
                return userCredential.user;
            });
    };

    const signInAsGuest = () => {
        return signInAnonymously(auth)
            .then((userCredential) => {
                saveUserToLocalStorage(userCredential.user);
                setCurrentUser(userCredential.user);
                return userCredential.user;
            });
    };

    const logout = () => {
        return signOut(auth).then(() => {
            clearUserFromLocalStorage();
            setCurrentUser(null);
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                saveUserToLocalStorage(user);
            } else {
                clearUserFromLocalStorage();
            }
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        signInAsGuest,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
