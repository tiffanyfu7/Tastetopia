import React from "react";
import { Rating } from "@mui/material";
import "../styles/RecipeDetail.css";

export const RecipeDetail = ({ recipe, onBackClick }) => {
  const formatTotalTime = (totalMinutes) => {
    if (totalMinutes <= 60) {
      if (totalMinutes == 0) {
        return 'Total time not provided.'
      } else {
        return `${totalMinutes} minutes`;
      }
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours} ${hours > 1 ? 'hrs' : 'hr'} and ${minutes} mins`;
    }
  };

  const formatNutrient = (value) => {
    if (value === 0) {
      return "0g";
    } else if (value < 1) {
      return "<1g";
    } else {
      return `${value.toFixed(0)}g`;
    }
  };
  
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
              <b>Total time:</b> {formatTotalTime(recipe.totalTime)} 
            </p>
            <p>
              <b>Yield:</b> {recipe.yield}
            </p>
            <p>
              <b>Full Recipe:</b> <a href={recipe.sourceURL}> {recipe.author} </a>
            </p>
          </div>
        </div>

        <div className="RecipeDetailTextBox">
          <div className="Ingredients">
            <h4>Ingredients</h4>
            <ul>
              {(recipe.ingredients).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <p>
            <b>Preparation:</b> <a href={recipe.sourceURL}> {recipe.author} </a>
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
                <li><b>Calories:</b> {formatNutrient(recipe.calories)}</li>
                <li><b>Fat:</b> {formatNutrient(recipe.fat)}</li>
                <li><b>Carbs:</b> {formatNutrient(recipe.carbs)}</li>
                <li><b>Protein:</b> {formatNutrient(recipe.protein)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
