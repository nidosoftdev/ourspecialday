

import {db, auth} from "./config"
import {getDoc,addDoc, getDocs, collection, query, where, updateDoc, doc, deleteDoc} from  'firebase/firestore'
import {
  deleteUser as authDeleteUser,
  UserCredential,
} from "firebase/auth";

// Collection reference
const eventCollectionRef = collection(db,"event")


// Update a specific Event by id and userId
export const updateEventById = async (id, updatedData, userId) => {
    // Create a query to find the Event by id and userId
    const eventQuery = query(eventCollectionRef, where("id", "==", id), where("userId", "==", userId));

    try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(eventQuery);

        // Check if there are matching documents
        if (querySnapshot.empty) {
            console.log('No matching documents for the given id and userId.');
            return { success: false, message: 'No matching documents.' };
        }

        // Assuming there is only one event with a given id and userId
        const eventDoc = querySnapshot.docs[0];

        // Update the event document with the new data
        await updateDoc(doc(eventCollectionRef, eventDoc.id), updatedData);

        console.log('Event updated successfully.');

        return { success: true };
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

// Function to delete an Event based on a event
export const deleteEventById = async (id, userId) => {
    try {
      // Fetch initial user data before attempting to delete
      const event = await getEventById(id,userId);
  
      if (!event) {
        console.log("event not found.");
        return { success: false, message: "Event not found." };
      }
  
      // Delete the user document in Firestore
      await deleteDoc(doc(eventCollectionRef, id));

     // Need to delete all the Address and eventsite under this Event   
  
      console.log("Event and associated data deleted successfully.");
  
      return { success: true };
    } catch (error) {
      console.error("Error deleting Event:", error);
      throw error;
    }
  };

// Get a single Event by an specific user
export const getEventById = async(id, formURL)=>{
    const eventquery = query(eventCollectionRef, where("formURL", "==", formURL));

    try {
    // Get the documents that match the query
    const querySnapshot = await getDocs(eventquery);

    // Check if there are matching documents
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return null;
    }
    const eventDetail = querySnapshot.docs
    .filter(doc => doc.id == id)
    .map((doc)=>({...doc.data(), id:doc.id}));
    
    return eventDetail[0];

  } catch (error) {
    console.error("Error getting eventDetail by id:", error);
    throw error;
  }
}

// get all events for a specific user
export const getAllEvent = async (userId) => {
    try {
        const data = await getDocs(eventCollectionRef);
        const events = data.docs
            .filter((doc) => doc.data().userId === userId) // Filter based on userId
            .map((doc) => ({ ...doc.data(), id: doc.id }));

        return events;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getEventUrl = async (formurl)=> {
    const eventquery = query(eventCollectionRef, where("formURL", "==", formurl));
    try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(eventquery);
        // Check if there are matching documents
        if (querySnapshot.empty) {
            console.log('No matching documents.');
            return null;
        }
        const eventDetail = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return eventDetail;
    } catch (error) {
        console.error("Error getting eventDetail by id:", error);
        throw error;
    }

}

// Create new Event
export const createEvent = async (data) => {
    try {


      // check if the formURL is already taken
      const eventquery = query(eventCollectionRef, where("formURL", "==", data.formURL));
      // Get the documents that match the query
      const querySnapshot = await getDocs(eventquery);
  
      // Check if there are matching documents
      if (querySnapshot.empty) {
        
        // This needs to be set properly, but since we are not sure what is going to be inside it as yet
        const newEvent = await addDoc(eventCollectionRef, data);
  
        return {"newEvent added with ID: ":  newEvent.id};
  
      }
      else{
        return false
      }
       
      
    } catch (err) {
      console.error("Error adding newEvent: ", err);
      return err;
    }
};