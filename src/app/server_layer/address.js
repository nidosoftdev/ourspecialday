

import {db, auth} from "./config"
import {getDoc,addDoc, getDocs, collection, query, where, updateDoc, doc, deleteDoc} from  'firebase/firestore'
import {
  deleteUser as authDeleteUser,
  UserCredential,
} from "firebase/auth";

// Collection reference
const addressCollectionRef = collection(db,"address")



// update a user
export const updateAddressById = async (id, updatedData, userId) => {
    // Create a query to find the address userId
    const addressQuery = query(addressCollectionRef, where("userId", "==", userId));

    try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(addressQuery);

        // Check if there are matching documents
        if (querySnapshot.empty) {
            console.log('No matching documents for the given id and userId.');
            return { success: false, message: 'No matching documents.' };
        }

        // Assuming there is only one address with a given id and userId
        const addressDoc = querySnapshot.docs[0];

        // Update the address document with the new data
        await updateDoc(doc(addressCollectionRef, id), updatedData);

        console.log('Address updated successfully.');

        return { success: true };
    } catch (error) {
        console.error('Error updating address:', error);
        throw error;
    }
};


// Function to delete an address based on a user
export const deleteAddressById = async (id, userId) => {
    try {
      // Fetch initial user data before attempting to delete
      const address = await getAddressById(id,userId);
  
      if (!address) {
        console.log("address not found.");
        return { success: false, message: "address not found." };
      }
  
      // Delete the user document in Firestore
      await deleteDoc(doc(addressCollectionRef, id));
  
      console.log("Address and associated data deleted successfully.");
  
      return { success: true };
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  };


// Get a single address by a user
export const getAddressById = async(id, userId)=>{
    const addressQuery = query(addressCollectionRef, where("userId", "==", userId));

    try {
    // Get the documents that match the query
    const querySnapshot = await getDocs(addressQuery);

    // Check if there are matching documents
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return null;
    }
    const addressDetail = querySnapshot.docs
    .filter(doc => doc.id == id)
    .map((doc)=>({...doc.data(), id:doc.id}));
    
    return addressDetail[0];

  } catch (error) {
    console.error("Error getting addressDetail by id:", error);
    throw error;
  }
}

// get all addresses for a specific user
export const getAllAddress = async (userId) => {
    try {
        const data = await getDocs(addressCollectionRef);
        const addresses = data.docs
            .filter((doc) => doc.data().userId === userId) // Filter based on userId
            .map((doc) => ({ ...doc.data(), id: doc.id }));

        return addresses;
    } catch (err) {
        console.log(err);
        return err;
    }
};


// Create new Address
export const createAddress = async (data) => {
    try {
        // This needs to be set properly, but since we are not sure what is going to be inside it as yet
      const newAddress = await addDoc(addressCollectionRef, data);
  
      return {"new Address added with ID: ":  newAddress.id};

    } catch (err) {
      console.error("Error adding new Address: ", err);
      return err;
    }
};