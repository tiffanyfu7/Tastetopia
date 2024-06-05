import { React, useState, useEffect, useContext } from "react";
import { Navbar } from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import { RecipeDetail } from "../components/RecipeDetail";
import { QueryContext } from "../components/QueryContext";
import axios from 'axios';
import "../styles/Explore.css";
import SearchBar from "../components/SearchBar";

export const Recipes = ({ q }) => {
  const { searchRequested, setSearchRequested } = useContext(QueryContext);
  const [cardClicked, setCardClicked] = useState(false);
  const [cardIndex, setCardIndex] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [apiRecipes, setAPIRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const showTypes = ["All","Vegetarian","<15 Minutes", "Halal", "Mexican"]

  useEffect(() => {
    if (searchRequested) {
      searchEdamam();
      setSearchRequested(false);
    }
  }, [searchRequested]);

  const searchEdamam = async () => {
    try {
        const response = await axios.post('http://localhost:8000/edamam/search', {
            q: searchRequested
        });
        console.log(response.data);
        setAPIRecipes(response.data);
        setRecipes(response.data);
    } catch (error) {
        console.log('Error searching Edamam: ', error);
    }
}

  //get all recipes from db
  // const recipes = [
  //   {
  //     image:
  //       "https://lifeloveandgoodfood.com/wp-content/uploads/2022/07/Spaghetti-and-Meatballs-Hero-2-1200x1200-1-500x375.jpg",
  //     title: "Classic Spaghetti and Meatbalss with Creamy Tomato Sauce",
  //     author: "Edaman",
  //     rating: 4.5,
  //     totalTime: 30,
  //     cuisineType: ["Italian"],
  //     dietLabels: [""],
  //     healthLabels: ["Gluten-Free"],
  //     uri: "somestring",
  //   },
  //   {
  //     image:
  //       "https://www.nutmegnanny.com/wp-content/uploads/2022/06/green-goddess-salad-11.jpg",
  //     title: "Green Goddess Salad with Homemade Caesar Dressing",
  //     author: "Karen Smith",
  //     rating: 4.0,
  //     totalTime: 15,
  //     cuisine: "American",
  //     dietLabels: ["Low-Fat"],
  //     healthLabels: ["Vegetarian"],
  //     uri: null,
  //   },
  // ];

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setCardClicked(true);
  };

  const handleBackClick = () => {
    setCardClicked(false);
    setSelectedRecipe(null);
  };

  const handleSearchSubmit = (query) => {
    setSearchRequested(query);
  }

  return (
    <>
      {/* {console.log("card clicked", cardClicked)} */}
      <Navbar current="Recipes" onSearchSubmit={handleSearchSubmit}/>
      <div className="page-container">
        <h1>Widen Your Culinary Experience</h1>

        {/* <SearchBar />  add a search bar here to display on mobile view*/}

        {cardClicked ? (
          <RecipeDetail recipe={selectedRecipe} onBackClick={handleBackClick} />
        ) : (
          <div className="recipe-cards-container">
            {recipes &&
              recipes.map((recipe, i) => (
                <RecipeCard
                  recipe={recipe}
                  key={i}
                  onClick={() => handleCardClick(recipe)}
                  variant="basic"
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};