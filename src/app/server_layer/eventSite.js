

import {db, auth} from "./config"
import {getDoc,addDoc, getDocs, collection, query, where, updateDoc, doc, deleteDoc} from  'firebase/firestore'
import {
  deleteUser as authDeleteUser,
  UserCredential,
} from "firebase/auth";

// Collection reference
const eventSiteCollectionRef = collection(db,"eventSite")



// update a EventSite
export const updateEventSiteById = async (id, updatedData, userId) => {
    // Create a query to find the EventSite userId
    const eventSiteQuery = query(eventSiteCollectionRef, where("userId", "==", userId));

    try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(eventSiteQuery);

        // Check if there are matching documents
        if (querySnapshot.empty) {
            console.log('No matching documents for the given id and userId.');
            return { success: false, message: 'No matching documents.' };
        }

        // Update the address document with the new data
        await updateDoc(doc(eventSiteCollectionRef, id), updatedData);

        console.log('EventSite updated successfully.');

        return { success: true };
    } catch (error) {
        console.error('Error updating EventSite:', error);
        throw error;
    }
};


// Function to delete an EventSite based on a user
export const deleteAddressById = async (id, userId) => {
    try {
      // Fetch initial user data before attempting to delete
      const eventSite = await getEventSiteById(id,userId);
  
      if (!eventSite) {
        console.log("eventSite not found.");
        return { success: false, message: "EventSite not found." };
      }
  
      // Delete the user document in Firestore
      await deleteDoc(doc(eventSiteCollectionRef, id));
  
      console.log("Eventsite and associated data deleted successfully.");
  
      return { success: true };
    } catch (error) {
      console.error("Error deleting EventSite:", error);
      throw error;
    }
  };


// Get a single EventSite by a user
export const getEventSiteById = async(id, userId)=>{
    const eventQuery = query(eventSiteCollectionRef, where("userId", "==", userId));

    try {
    // Get the documents that match the query
    const querySnapshot = await getDocs(eventQuery);

    // Check if there are matching documents
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return null;
    }
    const eventSite = querySnapshot.docs
    .filter(doc => doc.id == id)
    .map((doc)=>({...doc.data(), id:doc.id}));
    
    return eventSite[0];

  } catch (error) {
    console.error("Error getting EventSite by id:", error);
    throw error;
  }
}

// get all EventSite for a specific user
export const getAllEventSite = async (userId) => {
    try {
        const data = await getDocs(eventSiteCollectionRef);
        const eventSites = data.docs
            .filter((doc) => doc.data().userId === userId) // Filter based on userId
            .map((doc) => ({ ...doc.data(), id: doc.id }));

        return eventSites;
    } catch (err) {
        console.log(err);
        return err;
    }
};


// Create new EventSite
export const createEventSite = async (data) => {
    try {
        // This needs to be set properly, but since we are not sure what is going to be inside it as yet
      const newEventSite = await addDoc(eventSiteCollectionRef, data);
  
      return {"newEventSite added with ID: ":  newEventSite.id};

    } catch (err) {
      console.error("Error adding newEventSite: ", err);
      return err;
    }
};