import { addDoc, collection, doc, getDocs,setDoc } from "firebase/firestore";
import { db } from "@/config/firebase_config";
import axios from "axios";





export async function AddDataFireBase(coll: string, data: unknown) {
  try {
    const docRef = await addDoc(collection(db, coll), data);
    return docRef.id;
  } catch (e) {
    throw e;
  }
}

export async function getCollectionFireBase(coll: string) {
  try {
    const querySnapshot = await getDocs(collection(db, coll));
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  } catch (e) {
    throw e;
  }
}

