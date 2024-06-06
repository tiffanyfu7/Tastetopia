import express from 'express';
import dotenv from 'dotenv';
import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc, setDoc, addDoc, deleteDoc, getDoc } from "firebase/firestore";

dotenv.config();
const router = express.Router();


router.get("/", async (req,res) => {
    try{
        const ret = []

        try{
           const allRecipes = await getDocs(collection(db, "Recipe"));
                 
        allRecipes.forEach((recipe) => {
            ret.push({
                id: recipe.id,
                ...recipe.data()
            })
        })
        
        } catch (e) {
            console.log("can't get recipes", e.message)
        }
        
        res.status(200).json(ret)  
    } catch(e) {
        console.error(e.message)
        res.status(400).json({error: "Error fetching recipe data"})  
    }
})

router.get("/:id", async (req,res) => {
    try{
        const recipeId = req.params.id
        let docToFetch = null;
        try{
           docToFetch = await getDoc(doc(db, "Recipe", recipeId));
        
        } catch (e) {
            console.log("can't get specific recipe", e.message)
        }
        
        res.status(200).json(docToFetch)  
    } catch(e) {
        console.error(e.message)
        res.status(400).json({error: "Error fetching recipe data"})  
    }
})


router.post("/", async (req,res) => {
    try{
        const recipeToAdd = req.body
        console.log("recipeToAdd", recipeToAdd);
        const recipeId = req.body.id;
        const docRef = await setDoc(doc(db, "Recipe", recipeId), recipeToAdd);

        console.log("recipeId and docRef.id", recipeId, docRef.id)
        res.status(200).json(docRef.id)
    } catch (e) {
        console.error("post new recipe error", e.message)
        res.status(400).json({error: "Error posting recipe"})  
    }
})

router.post("/:id", async (req,res) => {
    try{
        const docId = req.params.id;

        console.log('docId', docId);
        const curRecipe = await getDoc(doc(db, "Recipe", docId));
        console.log('curRecipe', curRecipe.data());

        const curReviews = curRecipe.data().reviews;
        console.log("curReviews", curReviews)

        const review = {
            username: req.body.username,
            rating: req.body.rating,
            comment: req.body.comment
        }
        const newReviews = [...curReviews, review]
        console.log('new reviews', newReviews)


        try{
            await updateDoc(doc(db, "Recipe", docId), {
                reviews: newReviews
            });
    
        } catch(e) {
            console.log("can't update recipes", e.message);
        }

        res.status(200).json(newReviews);
    } catch (e) {
        console.error("post by recipe id error", e.message)
        res.status(400).json({error: "Error updating recipe reviews"})  
    }
})



export default router;