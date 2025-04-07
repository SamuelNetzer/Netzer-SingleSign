declare module 'firebase/app';

declare module 'firebase/auth' {
  import { FirebaseApp } from 'firebase/app';
  
  export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    phoneNumber: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
      creationTime?: string;
      lastSignInTime?: string;
    };
    providerData: Array<{
      providerId: string;
      uid: string;
      displayName: string | null;
      email: string | null;
      phoneNumber: string | null;
      photoURL: string | null;
    }>;
  }

  export function getAuth(app?: FirebaseApp): any;
  export function signInWithPopup(auth: any, provider: any): Promise<any>;
  export function signOut(auth: any): Promise<void>;
  export function onAuthStateChanged(auth: any, nextOrObserver: (user: User | null) => void, error?: (error: any) => void): () => void;
  export class GoogleAuthProvider {
    constructor();
    addScope(scope: string): GoogleAuthProvider;
    setCustomParameters(params: object): GoogleAuthProvider;
  }
}

declare module 'firebase/firestore';
declare module 'firebase-admin/auth'; 