import React from "react";
import { Rating } from "@mui/material";
import "../styles/RecipeDetail.css";

export const RecipeDetail = ({ recipe, onBackClick }) => {

  

  return (
    <>
      <button className="BackButton" onClick={ onBackClick }>
        Back
      </button>
      <div className="RecipeBox">
        <div className="RecipeHeader">
          <img
            alt={recipe.title}
            src={recipe.image}
            className="RecipeImg"
          ></img>

          <div className="RecipeHeaderText">
            <h2>{recipe.title}</h2>
            <h4>{recipe.author}</h4>
            <p>
              <b>Total time:</b> {recipe.totalTime}
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
          <p>
            <b>Preparation:</b>
          </p>
          <div className="HorizontalRecipeText">
            <div className="HealthLabels">
              <h4>Health Labels: </h4>
              <ul>
                {(recipe.healthLabels).map((label, index) => (
                    <li key={index}>{label}</li>
                ))}
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
