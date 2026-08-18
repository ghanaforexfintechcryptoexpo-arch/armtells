import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  auth, 
  db, 
  signInWithGoogle as fbSignInWithGoogle, 
  signOutUser as fbSignOutUser,
  testFirestoreConnection,
  handleFirestoreError,
  OperationType 
} from '../services/firebase';
import { storageService } from '../services/storage';
import { User, UserRole, DeliveryRequest, Tanker, Quote } from '../types';

interface FirebaseContextType {
  firebaseUser: FirebaseUser | null;
  currentUser: User;
  loading: boolean;
  isFirebaseConnected: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  switchUserRole: (user: User) => void;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(storageService.getCurrentUser());
  const [loading, setLoading] = useState<boolean>(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check connection to Firestore
    testFirestoreConnection().then(connected => {
      setIsFirebaseConnected(connected);
    });

    // 2. Listen to Auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        // Build or fetch user profile from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const snapshot = await getDoc(userDocRef);
          const isAdminEmail = user.email === 'ghanaforexfintechcryptoexpo@gmail.com';
          let role: UserRole = isAdminEmail ? 'SUPER_ADMIN' : 'CUSTOMER';

          let appUser: User;
          if (snapshot.exists()) {
            const data = snapshot.data();
            appUser = {
              id: user.uid,
              name: data.name || user.displayName || 'Authorized User',
              email: user.email || '',
              phone: data.phone || user.phoneNumber || '+233 24 000 0000',
              role: isAdminEmail ? 'SUPER_ADMIN' : (data.role || 'CUSTOMER'),
              createdAt: data.createdAt || new Date().toISOString()
            };
          } else {
            appUser = {
              id: user.uid,
              name: user.displayName || 'Armtells Enterprise User',
              email: user.email || '',
              phone: user.phoneNumber || '+233 24 000 0000',
              role: isAdminEmail ? 'SUPER_ADMIN' : 'CUSTOMER',
              createdAt: new Date().toISOString()
            };
            // Save to Firestore
            await setDoc(userDocRef, appUser);
          }
          storageService.setCurrentUser(appUser);
          setCurrentUser(appUser);
        } catch (err) {
          console.warn('Could not sync user profile to Firestore:', err);
        }
      } else {
        // Fallback to currently selected session user in storageService
        setCurrentUser(storageService.getCurrentUser());
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await fbSignInWithGoogle();
    } catch (err) {
      console.error('Sign in failed:', err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await fbSignOutUser();
      const defaultUser = storageService.getUsers()[0];
      storageService.setCurrentUser(defaultUser);
      setCurrentUser(defaultUser);
    } catch (err) {
      console.error('Sign out failed:', err);
      throw err;
    }
  };

  const switchUserRole = (user: User) => {
    storageService.setCurrentUser(user);
    setCurrentUser(user);
  };

  return (
    <FirebaseContext.Provider
      value={{
        firebaseUser,
        currentUser,
        loading,
        isFirebaseConnected,
        signInWithGoogle,
        signOut,
        switchUserRole
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
