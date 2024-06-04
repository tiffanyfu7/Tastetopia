import React from "react";
import { Navbar } from "../components/Navbar";

export const Recipes = () => {
  const RecipeDetail = () => {
    return (
      <>
        <button>Back</button>
        <div className="recipeBox">
          <img
            alt="pasta"
            src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1615916524567.jpeg"
            width="30%"
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Get a Taste</h1>
      </div>
      <RecipeDetail />
    </>
  );
};
