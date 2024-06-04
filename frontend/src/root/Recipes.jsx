import React from "react";
import { Navbar } from "../components/Navbar";
import RecipeSearchBar from "../components/RecipeSearchBar";

export const Recipes = () => {
  return (
    <>
      <Navbar />
      <div>Recipes</div>
      <RecipeSearchBar />
    </>
  );
};