import React from "react";
import { Navbar } from "../components/Navbar";
import "../styles/RecipeDetail.css";
import RecipeCard from "../components/RecipeCard";
import '../styles/Explore.css';

export const Recipes = () => {

<<<<<<< HEAD

  const RecipeDetails = () => {
    return (
      <>
        <button className="BackButton">Back</button>
        <div className="RecipeBox">
          <div className="RecipeHeader">
            <img
              alt="pasta"
              src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1615916524567.jpeg"
              className="RecipeImg"
            ></img>

            <div className="RecipeHeaderText">
              <h2>Pasta</h2>
              <p>
                <b>Total time:</b>
              </p>
              <p>
                <b>Yield:</b>
              </p>
              <p>
                <b>Full Recipe:</b>
                <a href="https://www.foodnetwork.com/recipes/food-network-kitchen/baked-feta-pasta-9867689">
                  Food Network
                </a>
              </p>
            </div>
          </div>

          <div className="RecipeDetailTextBox">
            <div className="Ingredients">
                <h4>Ingredients</h4>
                <ul>
                    <li>pasta</li>        
                    <li>pasta</li>  
                    <li>pasta</li>  
                </ul>
            </div>
            <p><b>Preparation:</b></p>
            <div className="HorizontalRecipeText">
              <div className="HealthLabels">
                <h4>Health Labels: </h4>
                <ul>
                  <li>peanut free</li>
                  <li>peanut free</li>
                  <li>peanut free</li>
                </ul>
              </div>
              <div className="Nutrition">
                <h4>Nutrition: </h4>
                <ul>
                  <li>
                    <b>Calories: </b>450
                  </li>
                  <li>
                    <b>Calories: </b>450
                  </li>
                  <li>
                    <b>Calories: </b>450
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
=======
>>>>>>> main
  //get all recipes from db
  const recipes = [{
    image: "https://lifeloveandgoodfood.com/wp-content/uploads/2022/07/Spaghetti-and-Meatballs-Hero-2-1200x1200-1-500x375.jpg",
    title: "Classic Spaghetti and Meatbalss with Creamy Tomato Sauce",
    author: "Edaman",
    rating: 4.5,
    totalTime: 30,
    cuisineType: ["Italian"],
    dietLabels: [""],
    healthLabels: ["Gluten-Free"],
    uri: "somestring"
  },{
    image: "https://www.nutmegnanny.com/wp-content/uploads/2022/06/green-goddess-salad-11.jpg",
    title: "Green Goddess Salad with Homemade Caesar Dressing",
    author: "Karen Smith",
    rating: 4.0,
    preptime: 15,
    cuisine: "American",
    dietLabels: ["Low-Fat"],
    healthLabels: ["Vegetarian"],
    uri: null,
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
