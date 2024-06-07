import React, { useContext, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import HomepageCards from "../components/HomepageCards";
import { QueryContext } from "../components/QueryContext";
import { RecipeContext } from "../components/RecipeContext";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';

export const Homepage = () => {
  const { setSearchRequested } = useContext(QueryContext);
  const { setRecipe } = useContext(RecipeContext);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  
  const handleSearchSubmit = (query) => {
    setSearchRequested(query);
  };

  const handleCardClick = (recipe) => {
    setRecipe(recipe);
    navigate(`/Recipes/detail/${recipe.id}`);
  };

  useEffect(() => {
    if (!currentUser) {
        navigate('/'); // Redirect to login if not authenticated
    }
  }, [currentUser, navigate]);

  const dailyLunchRecipe = {
    id: "f21e59098088407c86c61077de24c6be",
    image: "https://images.food52.com/EbkY_HsbxffSaNQJ7fnDxW9_P_Q=/2016x1344/filters:format(webp)/5ac51c26-7432-4c72-a0a0-69f7617c714a--dandelion_a.jpg",
    title: "Pasta with Dandelion Greens",
    author: "Food52",
    rating: 4.5,
    totalTime: "Total time not provided.",
  };

  const dailyDinnerRecipe = {
    id: "b2c00994499f1db95fa5fe614468adf2",
    image: "https://images.food52.com/DzCh8_7xfNX4HINmKseK0f0yQMI=/1200x900/1ace7759-fedd-42b6-99fd-d58c9b212b07--IMG_6095.jpg",
    title: "Pink Walnut Pasta",
    author: "Food52",
    rating: 4.5,
  };

  const exploreCard = {
    image: "https://richanddelish.com/wp-content/uploads/2022/03/marble-loaf-cake.png",
    title: "Go To Explore",
    motto: "Taste Some New Flavors",
    link: "/Recipes/q="
  };

  const createCard = {
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2022/09/oatmeal-pancakes.jpg",
    title: "Create Recipe",
    motto: "Create a New Recipe",
    link: "/CreateRecipe"
  };

  const cookbookCard = {
    image: "https://www.cookingclassy.com/wp-content/uploads/2019/11/best-salad-7.jpg",
    title: "Go to Your Cookbook",
    motto: "See Your Recipes",
    link: "/YourCookbook"
  };

  return (
    <>
      <Navbar current="Home" onSearchSubmit={handleSearchSubmit} />
      <div className="page-container">
        <h1>Welcome to Tastetopia!</h1>

        <div className="daily-cards-container">
          <div onClick={() => handleCardClick(dailyLunchRecipe)}>
            <HomepageCards cardInfo={{ category: "Lunch", recipe: dailyLunchRecipe }} variant="daily" />
          </div>
          <div onClick={() => handleCardClick(dailyDinnerRecipe)}>
            <HomepageCards cardInfo={{ category: "Dinner", recipe: dailyDinnerRecipe }} variant="daily" />
          </div>
        </div>

        <div className="quick-link-container">
          <HomepageCards cardInfo={exploreCard} variant="quickLink" />
          <HomepageCards cardInfo={createCard} variant="quickLink" />
          <HomepageCards cardInfo={cookbookCard} variant="quickLink" />
        </div>
      </div>
    </>
  );
};
