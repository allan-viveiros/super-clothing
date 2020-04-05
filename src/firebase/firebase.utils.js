import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA5yN30sRjzP6bqlEtA3hK6kaMnS0CRlis",
    authDomain: "superclothing-db.firebaseapp.com",
    databaseURL: "https://superclothing-db.firebaseio.com",
    projectId: "superclothing-db",
    storageBucket: "superclothing-db.appspot.com",
    messagingSenderId: "415226686437",
    appId: "1:415226686437:web:5f3993668850945e2d1d0c",
    measurementId: "G-2NLQEQ9K0J"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    //console.log(snapShot);

    if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } 
      catch (error) {
        console.log('Error creating user', error.message);
      }
    }

    return userRef;
  };

  //Initializing the database app (connect)
  firebase.initializeApp(config);
  
  //Export firebase methods to use in another parts of app
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //Google authentication utility
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters( {prompt: 'select_account'} );
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  //Export the firebase whole library in case of need
  export default firebase;
