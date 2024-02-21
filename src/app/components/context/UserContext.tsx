"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getUserInfo } from '../../server_layer/authentication'; // adjust the import path as necessary

// Assuming User type is correctly imported from Firebase Auth
import { User } from 'firebase/auth';

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
    const fetchUserData = async () => {
      try {
        const user = await getUserInfo();
        setUserData(user); // This will store the user data or null if not logged in
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUserData(null); // Ensure userData is set to null if there's an error fetching
      } finally {
        setLoading(false); // Ensure loading is set to false after the attempt to fetch user data
      }
    };

    fetchUserData();
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
