// ================================
// Firebase Configuration
// ================================

const firebaseConfig = {

    apiKey: "AIzaSyCFGEgzjz29zDKPG3lD4iAtsBXY3UyU7sE",

    authDomain: "safeshe-f524b.firebaseapp.com",

    projectId: "safeshe-f524b",

    storageBucket: "safeshe-f524b.firebasestorage.app",

    messagingSenderId: "515420220069",

    appId: "1:515420220069:web:bc784cdc9128222f5c3b4c"

};

// ================================
// Initialize Firebase
// ================================

firebase.initializeApp(firebaseConfig);

// ================================
// Firebase Services
// ================================

const auth = firebase.auth();

const db = firebase.firestore();

console.log("✅ Firebase Connected Successfully");