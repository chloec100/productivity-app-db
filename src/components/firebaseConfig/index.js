// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Added
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Added StartFirebase function and getDatabase(app)
function StartFirebase() {
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCng2R_ZvRmT0dtZmg7dgW-Pm65-UjGIHk",
  authDomain: "productivity-app-db.firebaseapp.com",
  databaseURL: "https://productivity-app-db-default-rtdb.firebaseio.com",
  projectId: "productivity-app-db",
  storageBucket: "productivity-app-db.appspot.com",
  messagingSenderId: "400527081917",
  appId: "1:400527081917:web:04384773ee7def46da92d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

return getDatabase(app);
}

export default StartFirebase();