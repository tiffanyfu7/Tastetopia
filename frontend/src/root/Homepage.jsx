import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import HomepageCards from "../components/HomepageCards";
import { QueryContext } from "../components/QueryContext";

export const Homepage = () => {
  const { setSearchRequested } = useContext(QueryContext);

  const handleSearchSubmit = () => {
    setSearchRequested(true);
  }
  
  const lunchRecipe = {
    image: "https://therecipecritic.com/wp-content/uploads/2022/05/blt-1.jpg",
    title: "The Perfect BLT",
    author: "Rich Brian",
    rating: 4.5,
    totalTime: 20,
    cuisineType: ["American"],
    dietLabels: [""],
    healthLabels: [""],
    uri: ""
  }

  const dailyLunchRecipe = {
    category: "Lunch",
    recipe: lunchRecipe
  };

  const dinnerRecipe = {
    image: "https://www.motherthyme.com/wp-content/uploads/2017/01/ROASTED-GARLIC-SPAGHETTI-3.jpg",
    title: "Garlic Pasta",
    author: "Jane Doe",
    rating: 4.5,
    totalTime: 30,
    cuisineType: ["Italian"],
    dietLabels: [""],
    healthLabels: [""],
    uri: ""
  }

  const dailyDinnerRecipe = {
    category: "Dinner",
    recipe: dinnerRecipe
  };

  const exploreCard = {
    image: "https://richanddelish.com/wp-content/uploads/2022/03/marble-loaf-cake.png",
    title: "Go To Explore",
    motto: "Taste Some New Flavors",
    link: "/Recipes"
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
      <Navbar current="Home" onSearchSubmit={handleSearchSubmit}/>
      <div className="page-container">
        <h1>Welcome to Tastetopia!</h1>

        <div className="daily-cards-container">
          <HomepageCards cardInfo={dailyLunchRecipe} variant="daily" />
          <HomepageCards cardInfo={dailyDinnerRecipe} variant="daily" />
        </div>

          <div className="quick-link-container">
            <HomepageCards cardInfo={exploreCard}  variant="quickLink" />
            <HomepageCards cardInfo={createCard}  variant="quickLink" />
            <HomepageCards cardInfo={cookbookCard} variant="quickLink" />
          </div>
      </div>
    </>
  );
};
