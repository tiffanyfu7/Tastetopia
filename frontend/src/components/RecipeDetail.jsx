import { React, useState } from "react";
import { Rating } from "@mui/material";
import "../styles/RecipeDetail.css";
import Chatbot from "./Chatbot.jsx";

export const RecipeDetail = ({ recipe, onBackClick }) => {
<<<<<<< HEAD
  const [chatClicked, setChatClicked] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);

=======
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
  
>>>>>>> main
  return (
    <>
      <button className="BackButton" onClick={onBackClick}>
        Back
      </button>
      <div className="PageContainer">
        <div className="LeftSide">
          <div className="RecipeBox">
            <div className="RecipeHeader">
              <img
                alt={recipe.title}
                src={recipe.image}
                className="RecipeImg"
              ></img>

<<<<<<< HEAD
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

            <div className="RecipeHeaderDetails">
              <div className="Rating">
                <Rating
                  name="half-rating-read"
                  defaultValue={recipe.rating}
                  precision={0.5}
                  readOnly
                  className="Ratings"
                />
                <p>5 from 43 reviews</p>
              </div>

              <div className="DietLabels">
                <b>Diet labels: </b>
                {recipe.dietLabels}
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
                    {recipe.healthLabels.map((label, index) => (
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
          <div className="ReviewBox">
            <h2>Reviews</h2>
            <div className="Comments">
              <div className="CommentHeader">
                <div className="Profile">
                  <img
                    alt="profilepic"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2gT_WaagxlD08ouISiuXGA3Q5ggEc1ZVjg&s"
                    width='50px'
                  ></img>
                  <p style={{margin:"5px"}}>@username</p>
                </div>
                <Rating
                  name="half-rating-read"
                  defaultValue="5"
                  precision={0.5}
                  readOnly
                  className="Ratings"
                  style={{marginRight: "5px"}}
                />
                <b>Love this recipe!</b>
              </div>
              <p>
                This recipe has been such an amazing pick-me-up and is super
                easy to make - truly carried me through college
              </p>
            </div>
            <div style={{ margin:"5px", display:"flex", justifyContent: "center" }}>
            <button className="ReviewButton"
            onClick={() => setShowReviewBox(true)}>
              Leave a Review
            </button>
            </div>
  
          </div>
        </div>

        {console.log(chatClicked)}
        <div className={chatClicked ? "ExpandedChat" : "CollapsedChat"}>
          <div className="ChatHeader">
            <h2>Ask Sous Chef Sue!</h2>
            <p>
              Have any questions about the ingredients, recipe, or more? Ask
              Sue, our OpenAI Chatbot.
            </p>
          </div>
          {chatClicked && ( 
            <Chatbot />
          )}
          {!chatClicked && ( 
            <div className="buttonContainer">
              <button
                className="chatButton"
                onClick={() => setChatClicked(true)}
              >
                Start Chatting
              </button>
            </div>
          )}
=======
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
>>>>>>> main
        </div>
      </div>
    </>
  );
};
