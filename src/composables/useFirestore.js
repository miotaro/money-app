import { collection, addDoc, doc, deleteDoc, getDocs, setDoc, where, query } from "firebase/firestore";
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";

export const addRecordToFirestore = async (record) => {
  const uid = getAuth().currentUser?.uid
  try {
    const docRef = await addDoc(collection(db, "records"), {...record, uid})
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
};

export const updateRecordInFirestore = async (record) => {
  try {
    await setDoc(doc(db, "records", record.id), record); // 上書き
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteRecordFromFirestore = async (id) => {
  try {
    await deleteDoc(doc(db, "records", id))
    console.log("Deleted record:", id)
  } catch (e) {
    console.error("Error deleting document: ", e)
  }
};

export const fetchRecordsFromFirestore = async (uid) => {
  if (!uid) return []
  try {
    const q = query(collection(db, "records"), where('uid', '==', uid))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    console.error("Error fetching documents: ", e)
    return []
  }
}
