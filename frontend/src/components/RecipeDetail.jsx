import { React, useState, useContext, useEffect } from "react";
import { Rating } from "@mui/material";
import "../styles/RecipeDetail.css";
import Chatbot from "./Chatbot.jsx";
import { QueryContext } from "./QueryContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Navbar } from "./Navbar.jsx";
import axios from "axios";
import { RecipeContext } from "./RecipeContext.jsx";
import { UserContext } from "../components/UserContext.jsx";

export const RecipeDetail = () => {
  const [chatClicked, setChatClicked] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [comment, setComment] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const { recipe } = useContext(RecipeContext);
  const [isRecipeSaved, setRecipeSaved] = useState(false);
  const { searchRequested, setSearchRequested } = useContext(QueryContext);
  const navigate = useNavigate();
  const recipeId = useParams().id;

  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  const formatTotalTime = (totalMinutes) => {
    if (totalMinutes <= 60) {
      if (totalMinutes == 0) {
        return "Total time not provided.";
      } else {
        return `${totalMinutes} minutes`;
      }
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours} ${hours > 1 ? "hrs" : "hr"} and ${minutes} mins`;
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

  const fetchReviews = async () => {
    const response = await axios.get(
      `http://localhost:8000/recipe/${recipeId}`
    );
    if (response.data) {
      console.log("response", response.data);
      setAllReviews(response.data.reviews);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const newReview = { username: user.name, comment: comment, rating: rating };
    const recipeDocRef = await axios.get("http://localhost:8000/recipe");
    const allRecipes = recipeDocRef.data;

    const ids = [];
    allRecipes.map((eachRecipe) => ids.push(eachRecipe.id));
    const curRecipeExist = ids.includes(recipe.id);

    // if api recipe not present in db
    if (!curRecipeExist) {
      recipe["reviews"] = [newReview]; // add review field
      recipe["verified"] = true;
      const newRecipe = recipe;

      const newRecipeRef = await axios.post(
        `http://localhost:8000/recipe/`,
        newRecipe
      );
      const newRecipeId = newRecipeRef.data;

      const response = await axios.get(
        `http://localhost:8000/recipe/${newRecipeId}`
      );

      setAllReviews(response.data.reviews);
      fetchReviews();
    } else {
      console.log("recipe.id", recipe.id);

      try {
        const postResponse = await axios.post(
          `http://localhost:8000/recipe/${recipe.id}`,
          newReview
        );
        setAllReviews(postResponse.data);
      } catch (e) {
        console.error("can't post review on existing recipe", e.message);
      }
    }

    setRating(0);
    setComment("");
  };

  const onBackClick = () => {
    navigate(-1);
  };

  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/profile/user/${user.uid}`
    );
    console.log("hello", response.data);
    setUserData(response.data);
    const savedRecipes = response.data.savedRecipes;

    console.log(savedRecipes);
    const saved = savedRecipes.includes(recipeId);
    console.log("recipe saved?", saved);
    setRecipeSaved(saved);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSaveRecipe = async () => {
    const allRecipes = await axios.get(`http://localhost:8000/recipe/`);
    const ids = [];
    allRecipes.data.map((eachRecipe) => ids.push(eachRecipe.id));
    const curRecipeExist = ids.includes(recipe.id);

    // if api recipe not present in db
    if (!curRecipeExist) {
      const newRecipeId = await axios.post(
        `http://localhost:8000/recipe/`,
        recipe
      );
      console.log("post recipe response", newRecipeId.data);

      const body = {
        recipeId: newRecipeId.data,
      };
      const response = await axios.put(
        `http://localhost:8000/profile/user/${user.uid}`,
        body
      );
      console.log("saved new recipe", response.data);
    } else {
      console.log(recipeId);
      const body = {
        recipeId: recipeId,
      };
      const response = await axios.put(
        `http://localhost:8000/profile/user/${user.uid}`,
        body
      );
      console.log("saved existing recipe", response.data);
    }

    fetchUser();
  };

  const handleSearchSubmit = (query) => {
    setSearchRequested(query);
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeDoc = doc(db, "Recipe", recipeId);
        const recipeData = await getDoc(recipeDoc);
        if (recipeData.exists()) {
          setRecipe(recipeData.data());
        } else {
          const response = await axios.post(
            `http://localhost:8000/edamam/fetch/${recipeId}`
          );
          setRecipe(response.data);
        }
      } catch (error) {
        console.log("Error fetching recipe: ", error);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  return (
    <div>
      <Navbar current="Recipes" onSearchSubmit={handleSearchSubmit} />
      <br></br>
      <div className="HeaderButtons">
        <button className="BackButton" onClick={onBackClick}>
          Back
        </button>

        <button className="BackButton" onClick={onSaveRecipe}>
          {isRecipeSaved ? <p>Saved</p> : <p>Save Recipe</p>}
        </button>
      </div>

      {recipe ? (
        <div className="PageContainer">
          <div className="LeftSide">
            <div className="RecipeBox">
              <div className="RecipeHeader">
                <img
                  alt={recipe.title}
                  src={recipe.image}
                  className="RecipeImg"
                ></img>

                <div className="RecipeHeaderText">
                  <h2 style={{ textAlign: "left", color: "black" }}>
                    {recipe.title}
                  </h2>
                  <h4>By {recipe.author}</h4>
                  <p>
                    <b>Total time:</b> {formatTotalTime(recipe.totalTime)}
                  </p>
                  <p>
                    <b>Yield:</b> {recipe.yield}
                  </p>
                  {recipe.sourceURL && (
                    <p>
                      <b>Full Recipe:</b>
                      <a href={recipe.sourceURL}>{recipe.author}</a>
                    </p>
                  )}
                  <div className="DietLabels">
                    <b>Diet labels: </b>
                    {recipe.dietLabels}
                  </div>
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
                  <p style={{ margin: "0px 0px 20px 25px" }}>
                    5 from 43 reviews
                  </p>
                </div>
              </div>

              <div className="RecipeDetailTextBox">
                <div className="Ingredients">
                  <h4>Ingredients</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                {recipe.instructions && (
                  <>
                    <p>
                      <b>Preparation:</b>
                    </p>
                    <ol>
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </>
                )}
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
                        <b>Calories:</b> {formatNutrient(recipe.calories)}
                      </li>
                      <li>
                        <b>Fat:</b> {formatNutrient(recipe.fat)}
                      </li>
                      <li>
                        <b>Carbs:</b> {formatNutrient(recipe.carbs)}
                      </li>
                      <li>
                        <b>Protein:</b> {formatNutrient(recipe.protein)}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="ReviewBox">
              <h2>Reviews</h2>
              {allReviews &&
                allReviews.map((eachReview, index) => (
                  <>
                    <div key={index} className="Comments">
                      <div className="CommentHeader">
                        <div className="Profile">
                          <img
                            alt="profilepic"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2gT_WaagxlD08ouISiuXGA3Q5ggEc1ZVjg&s"
                            width="50px"
                          ></img>
                          <p style={{ margin: "5px" }}>
                            @{eachReview.username}
                          </p>
                        </div>
                        <Rating
                          name="half-rating-read"
                          defaultValue={eachReview.rating}
                          precision={0.5}
                          readOnly
                          className="Ratings"
                          style={{ marginRight: "5px" }}
                        />
                      </div>
                      <p>{eachReview.comment}</p>
                    </div>
                  </>
                ))}

              <div
                style={{
                  margin: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {showReviewBox ? (
                  <div className="ReviewBox">
                    <p>
                      <b>Rating: </b>
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </p>
                    <div className="CommentBox">
                      <form>
                        <label>
                          <b>Comment:</b>
                        </label>
                        <textarea
                          type="text"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button type="submit" className="ReviewButton">
                          Post
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <button
                    className="ReviewButton"
                    onClick={() => setShowReviewBox(true)}
                  >
                    Leave a Review
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={chatClicked ? "ExpandedChat" : "CollapsedChat"}>
            <div className="ChatHeader">
              <h2>Ask Sous Chef Sue!</h2>
              <p>
                Have any questions about the ingredients, recipe, or more? Ask
                Sue, our OpenAI Chatbot.
              </p>
            </div>
            {chatClicked && <Chatbot />}
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
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
