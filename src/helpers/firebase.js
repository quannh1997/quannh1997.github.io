import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove, push, update } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdbXAOKNj9UwJ4jXTq0y14I8iLZBqlVZQ",
  authDomain: "wedding-static-web.firebaseapp.com",
  databaseURL: "https://wedding-static-web-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wedding-static-web",
  storageBucket: "wedding-static-web.firebasestorage.app",
  messagingSenderId: "376026085135",
  appId: "1:376026085135:web:e928e4127f1a334047707a",
  measurementId: "G-LG69WL1TGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Helper functions for Registrations
export const saveRegistration = async (data) => {
  try {
    const registrationsRef = ref(database, 'registrations');
    const newRegistrationRef = push(registrationsRef);
    await set(newRegistrationRef, {
      ...data,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: newRegistrationRef.key };
  } catch (error) {
    console.error('Error saving registration:', error);
    return { success: false, error: error.message };
  }
};

export const getRegistrations = async () => {
  try {
    const registrationsRef = ref(database, 'registrations');
    const snapshot = await get(registrationsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    }
    return [];
  } catch (error) {
    console.error('Error getting registrations:', error);
    return [];
  }
};

export const deleteRegistration = async (id) => {
  try {
    const registrationRef = ref(database, `registrations/${id}`);
    await remove(registrationRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting registration:', error);
    return { success: false, error: error.message };
  }
};

// Helper functions for Wishes
export const saveWish = async (data) => {
  try {
    const wishesRef = ref(database, 'wishes');
    const newWishRef = push(wishesRef);
    await set(newWishRef, {
      ...data,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: newWishRef.key };
  } catch (error) {
    console.error('Error saving wish:', error);
    return { success: false, error: error.message };
  }
};

export const getWishes = async () => {
  try {
    const wishesRef = ref(database, 'wishes');
    const snapshot = await get(wishesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    }
    return [];
  } catch (error) {
    console.error('Error getting wishes:', error);
    return [];
  }
};

export const deleteWish = async (id) => {
  try {
    const wishRef = ref(database, `wishes/${id}`);
    await remove(wishRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting wish:', error);
    return { success: false, error: error.message };
  }
};

// Helper functions for Stories
export const saveStory = async (data) => {
  try {
    const storiesRef = ref(database, 'stories');
    const newStoryRef = push(storiesRef);
    await set(newStoryRef, {
      ...data,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: newStoryRef.key };
  } catch (error) {
    console.error('Error saving story:', error);
    return { success: false, error: error.message };
  }
};

export const updateStory = async (id, data) => {
  try {
    const storyRef = ref(database, `stories/${id}`);
    await update(storyRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating story:', error);
    return { success: false, error: error.message };
  }
};

export const getStories = async () => {
  try {
    const storiesRef = ref(database, 'stories');
    const snapshot = await get(storiesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    }
    return [];
  } catch (error) {
    console.error('Error getting stories:', error);
    return [];
  }
};

export const deleteStory = async (id) => {
  try {
    const storyRef = ref(database, `stories/${id}`);
    await remove(storyRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting story:', error);
    return { success: false, error: error.message };
  }
};

// Bulk delete
export const deleteMultipleItems = async (type, ids) => {
  try {
    const promises = ids.map(id => {
      const itemRef = ref(database, `${type}/${id}`);
      return remove(itemRef);
    });
    await Promise.all(promises);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting multiple ${type}:`, error);
    return { success: false, error: error.message };
  }
};

export default database;
