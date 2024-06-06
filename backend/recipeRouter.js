import express from 'express';
import dotenv from 'dotenv';
import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc, getDoc } from "firebase/firestore";

dotenv.config();
const router = express.Router();


router.get("/", async (req,res) => {
    try{
        ret = []
        const allRecipes = await getDocs(collection(db, "Recipe"));
        
        allRecipes.map((recipe) => {
            ret.push({
                id: recipe.id,
                ...recipe.data()
            })
        })

        res.status(200).json(ret)  
    } catch(e) {
        console.error(e.message)
        res.status(400).json("Error fetching recipe data")  
    }
})


router.post("/:id", async (req,res) => {
    try{
        const docId = req.params.id;
        const curRecipe = await getDoc(doc(db, "recipe", docId));
        const curReviews = curRecipe.data().reviews;

        const review = {
            username: req.body.username,
            rating: req.body.rating,
            comment: req.body.comment
        }
        const newReviews = [...curReviews, review]


        await updateDoc(doc(db, "recipe", docId), {
            reviews: newReviews
        });

        res.status(200).json("updated reviews sucessfully")
    } catch (e) {
        console.error(e.message)
        res.status(400).json("Error updating recipe reviews")  
    }
})

export default router;