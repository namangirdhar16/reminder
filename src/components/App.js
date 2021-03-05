import React from "react";

import './App.css';
import { auth, SignInWithGoogle } from '../firebase/firebase.utils';
import { signOut } from '../firebase/firebase.utils';
import { createUserProfileAndDocument } from '../firebase/firebase.utils';



class App extends React.Component{

    state = { currentUser: null  , photoUrl: null , events: [] };
    
    unsubscribeAuth = null;

    
    componentDidMount()
    {
        this.unsubscribeAuth = auth.onAuthStateChanged(async(user) => {
            
            if(user)
            {   
               const userRef = await createUserProfileAndDocument(user);
             
               userRef.onSnapshot((snapshot) => {
                  this.setState({
                      currentUser:{
                          id: snapshot.id,
                          ...snapshot.data(),
                         
                      }
                      ,imageUrl: user.photoURL
                  }, () => {
                      console.log(this.state);
                  })
               })
               
            }
            else
            this.setState({currentUser: null , imageUrl: null});
        
            
        })
        
    }
    

    componentWillUnmount()
    {
        this.unsubscribeAuth();

    }
    

   
    render()
    {  
        const currentUser = this.state.currentUser;
        console.log(currentUser);
        console.log(this.state);
        const imageUrl = this.state.imageUrl;
        console.log(imageUrl);
        return (
          
            <div className = "auth-page">
          
                <div className = "user-name">{currentUser ? currentUser.displayName : null }</div>
                {imageUrl ? <img src = {imageUrl}  /> : null}
                <div className = "buttons">
                  
                  <button className = "sign-in" onClick = {SignInWithGoogle} >Sign With Google</button>
                  <button className = "sign-out" onClick = {signOut}>Sign Out</button>
                </div>
                
            </div>
        )
       
          
        
    }
}


export default App;