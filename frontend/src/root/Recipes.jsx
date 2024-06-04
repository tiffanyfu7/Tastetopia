import React from "react";
import { Navbar } from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

export const Recipes = () => {
  //get all recipes from db
  const recipes = [{
    image: "https://lifeloveandgoodfood.com/wp-content/uploads/2022/07/Spaghetti-and-Meatballs-Hero-2-1200x1200-1-500x375.jpg",
    title: "Classic Spaghetti and Meatbalss with Creamy Tomato Sauce",
    author: "Cooking Mama",
    rating: 4.5,
    preptime: 30,
    cuisine: "Italian",
    createdBy: "api"
  },{
    image: "https://www.nutmegnanny.com/wp-content/uploads/2022/06/green-goddess-salad-11.jpg",
    title: "Green Goddess Salad with Homemade Caesar Dressing",
    author: "Karen Smith",
    rating: 4.0,
    preptime: 15,
    cuisine: "American",
    createdBy: "user"
  },{
    image: "https://grandbaby-cakes.com/wp-content/uploads/2021/02/birria-tacos-recipe-500x375.jpg",
    title: "The Perfect Birria Tacos",
    author: "Rosabella Sanchez",
    rating: 4.0,
    preptime: 60,
    cuisine: "Mexican",
    createdBy: "user"
  }]

  return (
    <>
      <Navbar />
      <h1>Get a Taste</h1>
      <div className="recipe-cards-container">
        {recipes && recipes.map((recipe, i) => (
          <RecipeCard recipe={recipe} key={i} />
        ))}
      </div>
    </>
  );
};
