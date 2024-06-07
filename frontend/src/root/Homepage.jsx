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
            <HomepageCards cardInfo={{ category: "Lunch", id: "3bc095c814af01cfc5e12aa3c3bad9e6" }} variant="daily" />
          </div>
          <div onClick={() => handleCardClick(dailyDinnerRecipe)}>
            <HomepageCards cardInfo={{ category: "Dinner", id: "3ca6b690ff1ac73c9950b2add2c755a0" }} variant="daily" />
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
