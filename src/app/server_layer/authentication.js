import {auth, googleProvider} from "./config"
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth"
import {createUser} from "./user"

// Create user with Email and Password
export const signup = async(userInfo)=>{
    try
    {
        // Create the email and password auth
        const authUserCredential = await createUserWithEmailAndPassword(
            auth,
            userInfo.email,
            userInfo.password
        );
        const authUser = authUserCredential.user;
        
        // then create user
        const user = await createUser({
            uid: authUser.uid,
            email: userInfo.email,
            name: userInfo.name
        });
        return authUser
        

    }
    catch(err){
        console.log(err)
    }
    
}

// Sign In user
export const signInUser= async(userInfo)=>{
    try
    {
        const userstatus = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        return userstatus
    }
    catch(err){
        console.log(err)
    }
    
}


// create user with Google
export const createUserWithGoogle = async(userInfo)=>{
    try
    {
        // Create the auth with google
        await signInWithPopup(auth, googleProvider)

        // then create user

    }
    catch(err){
        console.log(err)
    }
    
}

// Sign In user with google
export const signInUserWithGoogle = async(userInfo)=>{
    try
    {
        // Check for the user

        // then sign them in
        await signInWithPopup(auth, googleProvider)
    }
    catch(err){
        console.log(err)
    }
    
}