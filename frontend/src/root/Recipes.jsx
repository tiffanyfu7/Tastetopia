import React from "react";
import { Navbar } from "../components/Navbar";
import "../styles/Recipes.css"

export const Recipes = () => {
  const RecipeDetails = () => {
    return (
      <>
        <button>Back</button>
        <div>
          <div>
            <img
              alt="pasta"
              src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1615916524567.jpeg"
              width="30%"
            ></img>

            <div className="RecipeHeader">
              <h2>Pasta</h2>
              <p>
                <b>Total time:</b>
              </p>
              <p>
                <b>Yield:</b>
              </p>
              <p>
                <b>Full Recipe:</b>
                <a href="https://www.foodnetwork.com/recipes/food-network-kitchen/baked-feta-pasta-9867689">Food Network</a>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div>Recipes</div>
      <RecipeDetails />
    </>
  );
};
