import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Helicopter } from '../types';

const HELICOPTERS_COLLECTION = 'helicopters';

export async function addHelicopter(helicopter: Omit<Helicopter, 'id'>) {
  const docRef = await addDoc(collection(db, HELICOPTERS_COLLECTION), helicopter);
  return docRef.id;
}

export async function getHelicopters(): Promise<Helicopter[]> {
  const querySnapshot = await getDocs(collection(db, HELICOPTERS_COLLECTION));
  return querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })) as Helicopter[];
}

export async function deleteHelicopter(id: string) {
  await deleteDoc(doc(db, HELICOPTERS_COLLECTION, id));
}
