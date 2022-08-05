import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';
import Appwrapper from './components/appwrapper'; 


//Kytketään  sovellus Firebasen Firestore-palveluun, joka mahdollistaa reaaliaikaisen tietojen tallennuksen ja synkronoinnin.
const firebaseConfig = {
  apiKey: "AIzaSyChOUHW3Ai9qBXoD8WYxDKNh_jO-TIxTYI",
  authDomain: "askelhaaste.firebaseapp.com",
  projectId: "askelhaaste",
  storageBucket: "askelhaaste.appspot.com",
  messagingSenderId: "599825350850",
  appId: "1:599825350850:web:23ea14051913050e877b5b",
  measurementId: "G-CYPT1G1KKY"
};

//Appwrapper -komponentin kutsu, tarkoituksena on huolehtia siitä, että käyttäjä ohjataan
//joko sovelluksen etusivulle (App), jos käyttäjä on kirjautunut, muuten hänet 
//ohjataan kirjautumissivulle (Startup).
const root = document.getElementById('root');
ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Appwrapper />
  </FirebaseAppProvider>
  , root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
