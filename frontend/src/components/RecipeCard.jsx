import { Rating, Stack } from '@mui/material'
import React from 'react'
import { LIGHTGREEN, GREEN } from '../main'
import VerifyDeleteButton from './VerifyDeleteButton';

const RecipeCard = ({ recipe, onClick, variant }) => {
  // console.log(recipe);
  return (
    <>
      {/* Basic Card Display for Discover Page */}
      {variant == "basic" &&
        <div className="recipe-card card"
          style={{ backgroundColor: recipe.uri != null ? GREEN : LIGHTGREEN }}
          onClick={onClick}
        >
          <img className="recipe-card-image" src={recipe.image} alt={recipe.title} />
          <p className="recipe-card-title">{recipe.title}</p>
          <p className="recipe-card-author">{recipe.author}</p>
          <Rating name="simple-controlled" value={Number(recipe.rating)} precision={0.1} readOnly />
        </div>
      }

      {/* Variant with Quick Action Button */}
      {variant == "verify" &&
        <div className="recipe-card card"
          style={{ backgroundColor: LIGHTGREEN, height: "320px", width: "160"}}
        >
          <img className="recipe-card-image" src={recipe.image} alt={recipe.title}/>
          <p className="recipe-card-title">{recipe.title}</p>
          <p className="recipe-card-author">{recipe.author}</p>
          <button onClick={onClick} id="details-button">See Details</button>
          <div style={{ display: "inline-flex", justifyContent: "space-evenly", margin: "-10px 0px 0px -10px" }}>
            <VerifyDeleteButton recipeId={recipe.id} variant="verify" />
            <VerifyDeleteButton recipeId={recipe.id} variant="delete"/>
          </div>
        </div>
      }
    </>
  )
}

export default RecipeCard