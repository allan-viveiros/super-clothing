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

  /* This function will make a database request to get a new empty document and 
   * set my object to this new document */
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    //console.log(collectionRef);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
      //Thi code above will return from database a new empty document and a new random key
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
      console.log(newDocRef);      
    });

    return await batch.commit();
  }


  //Get documents from firebase by firestore
  export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });   
    //console.log(transformedCollection);
    
    //This function will accumulate all my collections by reducer
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  }


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
