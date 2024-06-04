import React from 'react'
import { Rating } from '@mui/material'
import '../styles/RecipeDetails.css';


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