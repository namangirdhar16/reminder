import firebase from "firebase/app";
import   "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDClMrFdQDaGsI9Px3OLQnTgrTc6Y3yhiQ",
    authDomain: "auth-app-db-799c8.firebaseapp.com",
    projectId: "auth-app-db-799c8",
    storageBucket: "auth-app-db-799c8.appspot.com",
    messagingSenderId: "312408683729",
    appId: "1:312408683729:web:d83766aeb6e2dc916f41f0",
    measurementId: "G-SE53VCQK56"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const firestore = firebase.firestore();



export const createUserProfileAndDocument = async (user) => {
   if(!user)
   return ;
   
  const userRef = firestore.doc(`users/${user.uid}`);

  const snapShot = await userRef.get();
  if(!snapShot.exists)
  { 
    try{
    await userRef.set({displayName: user.displayName , email: user.email , createdAt: new Date()});
    }
    catch(err)
    {
      console.log(err);
    }
  }
  console.log(userRef);
  console.log(snapShot.data());
  return userRef;
}

export const SignInWithGoogle = () => firebase.auth().signInWithPopup(provider)

export const signOut = () => firebase.auth().signOut();

