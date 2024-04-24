import {auth, googleProvider} from "./config"
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, updateProfile} from "firebase/auth"
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
         // Update the user's profile to set their display name
         await updateProfile(authUser, {
            displayName: userInfo.name, // Assuming userInfo.name is the desired display name
        });

        // then create user
        const user = await createUser({
            uid: authUser.uid,
            email: userInfo.email,
            name: userInfo.name
        });
        console.log(user)
        return user

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
        return err
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



export const getUserInfo = async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, return user information
                resolve(user);
            } else {
                // No user is signed in.
                reject('No user logged in');
            }
        });
    });
};