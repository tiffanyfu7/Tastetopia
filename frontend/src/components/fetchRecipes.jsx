import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchCreatedRecipes = async () => {
    const recipesCol = collection(db, 'Recipe');
    const recipesSnapshot = await getDocs(recipesCol);
    const recipesList = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return recipesList;
};
