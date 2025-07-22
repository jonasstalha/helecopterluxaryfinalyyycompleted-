import { collection, addDoc, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Helicopter } from '../types';
import { helicopterPackages } from '../data/helicopters';

const HELICOPTERS_COLLECTION = 'helicopters';

export const helicopterService = {
  async addHelicopter(helicopter: Omit<Helicopter, 'id'>) {
    const docRef = await addDoc(collection(db, HELICOPTERS_COLLECTION), helicopter);
    return docRef.id;
  },

  async getHelicopters(): Promise<Helicopter[]> {
    // For now, return static data. In production, this would fetch from Firebase
    return Promise.resolve(helicopterPackages);
  },

  async getHelicopter(id: string): Promise<Helicopter | null> {
    // For now, find in static data. In production, this would fetch from Firebase
    const helicopter = helicopterPackages.find(h => h.id === id);
    return Promise.resolve(helicopter || null);
  },

  async deleteHelicopter(id: string) {
    await deleteDoc(doc(db, HELICOPTERS_COLLECTION, id));
  }
};

// Legacy exports for backward compatibility
export async function addHelicopter(helicopter: Omit<Helicopter, 'id'>) {
  return helicopterService.addHelicopter(helicopter);
}

export async function getHelicopters(): Promise<Helicopter[]> {
  return helicopterService.getHelicopters();
}

export async function deleteHelicopter(id: string) {
  return helicopterService.deleteHelicopter(id);
}
