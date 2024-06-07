import express from "express";
import dotenv from "dotenv";
import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

dotenv.config();
const router = express.Router();

// Fetch all recipesrouter.get("/", async (req, res) => {
  try {
    const ret = [];

    try {
      const allRecipes = await getDocs(collection(db, "Recipe"));

      allRecipes.forEach((recipe) => {
        ret.push({
          id: recipe.id,
          ...recipe.data(),
        });
      });
    } catch (e) {
      console.log("can't get recipes", e.message);
    }

    res.status(200).json(ret);
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error fetching recipe data" });
  }
});

// Fetch specific recipe through docID
router.get("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    let docToFetch = null;
    try {
      docToFetch = await getDoc(doc(db, "Recipe", recipeId));

    } catch (e) {
      console.log("can't get specific recipe", e.message);
    }

    res.status(200).json(docToFetch.data());
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error fetching recipe data" });
  }
});
// Verify a recipe
router.put("/verify/:id", async (req,res) => {
    try{
        const recipeId = req.body.id;
        const docRef = await setDoc(doc(db, "Recipe", recipeId), {
            verified: true
        })
        res.status(200).json(docRef)  
    } catch(e) {
        res.status(400).json({error: "Error fetching recipe data"})  
    }
})

// Delete a recipe
router.put("/delete/:id", async (req,res) => {
    try{
        const recipeId = req.body.id;
        const docRef = await deleteDoc(doc(db, "Recipe", recipeId))
        res.status(200).json(docRef)
    } catch(e) {
        res.status(400).json({error: "Error fetching recipe data"})  
    }
})

// Adding a recipe
router.post("/", async (req, res) => {
  try {
    const recipeToAdd = req.body;
    const recipeId = req.body.id;

    await setDoc(doc(db, "Recipe", recipeId), recipeToAdd);

    res.status(200).json(recipeId);
  } catch (e) {
    console.error("post new recipe error", e.message);
    res.status(400).json({ error: "Error posting recipe" });
  }
});

// Adding a review?
router.post("/:id", async (req, res) => {
  try {
    const docId = req.params.id;
    const curRecipe = await getDoc(doc(db, "Recipe", docId));

    const review = {
      username: req.body.username,
      rating: req.body.rating,
      comment: req.body.comment,
    };

    let newReviews = [];
    if (curRecipe.data().reviews) {
      const curReviews = curRecipe.data().reviews;
      newReviews = [...curReviews, review];

      await updateDoc(doc(db, "Recipe", docId), {
        reviews: newReviews,
      });
    } 
    
    // if no review field
    else {
      newReviews.push(review);
      await updateDoc(doc(db, "Recipe", docId), {
        reviews: newReviews,
      });
    }

    res.status(200).json(newReviews);
  } catch (e) {
    console.error("post by recipe id error", e.message);
    res.status(400).json({ error: "Error updating recipe reviews" });
  }
});

export default router;
