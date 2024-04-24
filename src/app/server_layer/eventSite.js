

import {db, auth} from "./config"
import {getDoc,addDoc, getDocs, collection, query, where, updateDoc, doc, deleteDoc} from  'firebase/firestore'
import {
  deleteUser as authDeleteUser,
  UserCredential,
} from "firebase/auth";

// Collection reference
const eventSiteCollectionRef = collection(db,"eventSite")



// update a EventSite
export const updateEventSiteById = async (id, updatedData, eventId) => {
    // Create a query to find the EventSite userId
    const eventSiteQuery = query(eventSiteCollectionRef, where("eventId", "==", eventId));

    try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(eventSiteQuery);

        // Check if there are matching documents
        if (querySnapshot.empty) {
            console.log('No matching documents for the given id and eventId.');
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


// Function to delete an EventSite based on a event
export const deleteAddressById = async (id, eventId) => {
    try {
      // Fetch initial user data before attempting to delete
      const eventSite = await getEventSiteById(id,eventId);
  
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


// Get a single EventSite by for an event
export const getEventSiteById = async(id, eventId)=>{
    const eventQuery = query(eventSiteCollectionRef, where("eventId", "==", eventId));

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

// get all EventSite for a specific event
export const getAllEventSite = async (eventId) => {
    try {
        const data = await getDocs(eventSiteCollectionRef);
        const eventSites = data.docs
            .filter((doc) => doc.data().eventId === eventId) // Filter based on userId
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