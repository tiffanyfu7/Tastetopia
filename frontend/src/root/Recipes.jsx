import { React, useState, useEffect, useContext } from "react";
import { Navbar } from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import { QueryContext } from "../components/QueryContext";
import { RecipeContext } from "../components/RecipeContext.jsx";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Explore.css";

export const Recipes = () => {
  const { searchRequested, setSearchRequested } = useContext(QueryContext);
  const { setRecipe } = useContext(RecipeContext);
  const [cardClicked, setCardClicked] = useState(false);
  const [cardIndex, setCardIndex] = useState(null);
  // const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [apiRecipes, setAPIRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const showTypes = ["All","Vegetarian","<15 Minutes", "Halal", "Mexican"]

  useEffect(() => {
    if (searchRequested !== 'q=') {
      search();
    } else {
      getDefaultRecipes();
    }
  }, [searchRequested]);

  const search = async () => {
    try {
        const response = await axios.post('http://localhost:8000/explore/search-all', {
            q: searchRequested
        });
        console.log(response.data);
        setAPIRecipes(response.data);
        setRecipes(response.data);
    } catch (error) {
        console.log('Error searching Edamam: ', error);
    }
}

const getDefaultRecipes = async () => {
  try {
    const response = await axios.get('http://localhost:8000/explore/get-all');
    setRecipes(response.data);
  } catch (error) {
    console.log('Error fetching default recipes: ', error);
  }
}

  const handleCardClick = (recipe) => {
    setRecipe(recipe);
    navigate(`/Recipes/${searchRequested}/${recipe.id}`);
    // setCardClicked(true);
  };

  // const handleBackClick = () => {
  //   setCardClicked(false);
  //   setSelectedRecipe(null);
  // };

  const handleSearchSubmit = (query) => {
    setSearchRequested(query);
  }

  return (
    <>
      <Navbar current="Recipes" onSearchSubmit={handleSearchSubmit}/>
      <div className="page-container">
        <h1>Widen Your Culinary Experience</h1>
        <div className="recipe-cards-container">
          {recipes &&
            recipes.map((recipe, i) => (
              <RecipeCard
                recipe={recipe}
                key={i}
                onClick={() => handleCardClick(recipe)}
                variant="basic"
              />
            ))
          }
        </div>
      </div>
    </>
  );
};