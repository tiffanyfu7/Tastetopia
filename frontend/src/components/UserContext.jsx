import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Import your Firebase authentication module here

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                // If a user is authenticated, you can fetch additional user data here
                // For example, you can fetch user data from Firestore
                // Replace this with your own logic to fetch user data
                // const userData = await fetchUserData(authUser.uid);
                // setUser(userData);
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}> {/* Provide setUser in the context value */}
            {children}
        </UserContext.Provider>
    );
};
