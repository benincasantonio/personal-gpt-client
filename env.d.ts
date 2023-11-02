/// <reference types="vite/client" />

// interface for env variables
interface ImportMetaEnv {
    VITE_USER_BASE_URL: string;
    VITE_CHAT_BASE_URL: string;

    /*Firebase Keys*/
    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_AUTH_DOMAIN: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_APP_ID: string;
    VITE_FIREBASE_MEASUREMENT_ID: string;
}
