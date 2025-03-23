// Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyDVAsHMQLwsztJSuPlG1JccgOiFANERv_4",

    authDomain: "minnvotes.firebaseapp.com",

    projectId: "minnvotes",

    storageBucket: "minnvotes.firebasestorage.app",

    messagingSenderId: "999501885537",

    appId: "1:999501885537:web:9d438d27fd97cfc5167a20",

    measurementId: "G-8TH38XQR03"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
