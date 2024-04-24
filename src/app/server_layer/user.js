
import {db, auth} from "./config"
import {getDoc,addDoc, getDocs, collection, query, where, updateDoc, doc, deleteDoc} from  'firebase/firestore'
import {
  deleteUser as authDeleteUser,
  UserCredential,
} from "firebase/auth";

const userId = auth.currentUser?.uid
// Collection reference
const userCollectionRef = collection(db,"user")

// if(userId){
//   let createdUserCollectionRef = collection(db, "user/"+userId)
// }
// Get a single user
export const getUserByEmail = async(email)=>{
  const userQuery = query(userCollectionRef, where("email", "==", email));

  try {
    // Get the documents that match the query
    const querySnapshot = await getDocs(userQuery);

    // Check if there are matching documents
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return null;
    }
    const userDetail = querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
    
    return userDetail[0]; 

} catch (error) {
  console.error("Error getting user by email:", error);
  throw error;
}
}

// Function to delete user and associated data based on email
export const deleteUserByEmail = async (email) => {
  try {
    // Fetch initial user data before attempting to delete
    const user = await getUserByEmail(email);

    if (!user) {
      console.log("User not found.");
      return { success: false, message: "User not found." };
    }

    // Delete the user in Firebase Authentication
    await authDeleteUser(auth.currentUser);

    // Delete the user document in Firestore
    await deleteDoc(doc(userCollectionRef, user.id));

    console.log("User and associated data deleted successfully.");

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// update a user
export const updateUserByEmail = async (updatedData) => {
  // Create a query to find the user by email
  const userQuery = query(userCollectionRef, where("email", "==", updatedData.email));

  try {
    // Get the documents that match the query
    const querySnapshot = await getDocs(userQuery);

    // Check if there are matching documents
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return null;
    }

    // Assuming there is only one user with a given email
    const userDoc = querySnapshot.docs[0];

    // Update the user document with the new data
    await updateDoc(doc(userCollectionRef, userDoc.id), updatedData);

    console.log('User updated successfully.');

    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Create new user
export const createUser = async (userData) => {
    try {
      console.log("attempting to create user", userCollectionRef, userData)
      const newUser = await addDoc(userCollectionRef, {
        uid: userData.uid,
        name: userData.name,
        email: userData.email,
      });
      console.log("Create user", newUser)
      return newUser;

    } catch (err) {
      console.error("Error adding user: ", err);
      return err;
    }
  };

// get all users
export const getAllUsers = async()=>{
    try{
        const data = await getDocs(userCollectionRef)
        const users = data.docs.map((doc)=>({...doc.data(), id:doc.id}))
        return users
    }
    catch(err){
        console.log(TypeError)
        return err
    }
}
