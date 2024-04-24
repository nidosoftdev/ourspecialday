"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getUserInfo } from '../../server_layer/authentication'; // adjust the import path as necessary

// Assuming User type is correctly imported from Firebase Auth
import { User, onAuthStateChanged, getAuth } from 'firebase/auth';

interface UserContextType {
  userData: User | null; // Assuming the userData can be null or a User object
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  // Initialize userData as null assuming no user is logged in initially
  const [userData, setUserData] = useState<User | null>(null); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(
      auth, 
      (currentUser) => {
        // This function is called whenever the user's sign-in state changes.
        setUserData(currentUser); // currentUser is null if no user is signed in.
      }, 
      (error) => {
        // Optional: Handle errors here.
        console.error(error);
      },
      () => {
        // Optional: Cleanup or completion logic here.
      }
    );

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);


  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
