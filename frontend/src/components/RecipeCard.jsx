import { Rating, Stack } from '@mui/material'
import React from 'react'
import { LIGHTGREEN, GREEN } from '../main'

const RecipeCard = ({ recipe, variant}) => {
  return (
    <>
      {/* Basic Card Display for Discover Page */}
      {variant == "basic" &&
        <div className="recipe-card card"
          style={{ backgroundColor: recipe.uri != null ? GREEN : LIGHTGREEN }}
        >
          <img className="recipe-card-image" src={recipe.image} alt={recipe.title} />
          <p className="recipe-card-title">{recipe.title}</p>
          <p className="recipe-card-author">{recipe.author}</p>
          <Rating name="half-rating-read" defaultValue={recipe.rating} precision={0.5} readOnly />
        </div>
      }
    </>
  )
}

export default RecipeCard