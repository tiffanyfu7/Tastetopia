import React from "react";
import { Navbar } from "../components/Navbar";
import HomepageCards from "../components/HomepageCards";

export const Homepage = () => {
  
  const dailyLunchRecipe = {};

  const dailyDinnerRecipe = {};

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
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2022/09/oatmeal-pancakes.jpg",
    title: "Go to Your Cookbook",
    motto: "See Your Recipes",
    link: "/YourCookbook"
  };

  return (
    <>
      <Navbar current="Home" />
      <div className="page-container">
        <h1>Welcome to Tastetopia!</h1>

        <div className="quick-link-container">
          <HomepageCards cardInfo={exploreCard}  variant="quickLink" />
          <HomepageCards cardInfo={createCard} variant="quickLink" />
          <HomepageCards cardInfo={cookbookCard} variant="quickLink" />
        </div>
      </div>
    </>
  );
};
