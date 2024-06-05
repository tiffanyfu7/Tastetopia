import React, { useState } from 'react'
import { Navbar } from "../components/Navbar";
import '../styles/Cookbook.css'
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import RecipeCard from '../components/RecipeCard';

export const YourCookbook = () => {

  //toggle between "Created" and "Saved" recipes
  const [state, setState] = useState("Created");

  const createdRecipes = [{
    image: "https://www.motherthyme.com/wp-content/uploads/2017/01/ROASTED-GARLIC-SPAGHETTI-3.jpg",
    title: "Garlic Pasta",
    author: "Jane Doe",
    rating: 4.5,
    totalTime: 30,
    cuisineType: ["Italian"],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
  },{
    image: "https://www.noracooks.com/wp-content/uploads/2022/06/vegan-chocolate-chip-cookies-9.jpg",
    title: "Yummy Vegan Chocolate Chip Cookies",
    author: "Jane Doe",
    rating: 3.5,
    totalTime: 60,
    cuisineType: [""],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
  },{
    image: "https://www.simplyrecipes.com/thmb/5lSinrqYuCiNGFm0ESngGU9DF5U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Philly-Cheesesteak-LEAD-1-6dd0a1d4175d4b6cae203ba1fb7336e5.jpg",
    title: "Cheesesteak Straight Outta Philly",
    author: "Jane Doe",
    rating: 4.0,
    totalTime: 25,
    cuisineType: ["American"],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
   }]
  
  const savedRecipes = [{
    image: "https://www.romylondonuk.com/wp-content/uploads/2022/05/Iced-Vanilla-Latte-Starbucks-Style_04.jpg",
    title: "Copycat Starbucks Vanilla Latte",
    author: "Edaman",
    rating: 5.0,
    totalTime: 10,
    cuisineType: [""],
    dietLabels: [""],
    healthLabels: [""],
    uri: "somestring"
  },{
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/11/mashed-potatoes-recipe.jpg",
    title: "My Favorite Mashed Potatos",
    author: "Susy Cain",
    rating: 4.0,
    totalTime: 20,
    cuisineType: [""],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
  },{
    image: "https://assets-eu-01.kc-usercontent.com/559bb7d3-88a4-01c1-79a3-dd4d5b2d2bb0/08c582b3-eaea-43bf-a7cc-9e993f17b6ed/1-Mixed-berry-pancakes-web.jpg",
    title: "Merry Berry Pancakes",
    author: "Edaman",
    rating: 4.0,
    totalTime: 30,
    cuisineType: ["American"],
    dietLabels: [""],
    healthLabels: [""],
    uri: "somestring"
  }]

  return (
      <>
        <Navbar current="YourCookbook" />
        <div className="page-container cookbook-page">
        
          <div className="profile-info">
            <img
              id="profile-pic"
              src="https://pbs.twimg.com/profile_images/487911640147324928/3ZMfaTi8_400x400.jpeg"
              alt="profile-picture"
            /> 
            <p id="profile-username">Jane Doe</p>
          </div>
        
          <div id="create-save-buttons">
            <button
              className="toggle-button"
              onClick={() => setState("Created")}
              style={{textDecoration: state == "Created" ? "underline" : ""}}
            > Created </button>
            <button className="toggle-button"
              onClick={() => setState("Saved")}
              style={{ textDecoration: state == "Saved" ? "underline" : "" }}
            >Saved</button>
          </div>

          {state == "Created" &&
            <div className="list-recipes-container">
              <div id="create-new-card">
                <Link id="create-button" to="/CreateRecipe">
                  <IoAddOutline size={100} />
                </Link>
                <p id="create-new-text">Create New Recipe</p>
              </div>
              {createdRecipes.map((recipe) => (
                <RecipeCard recipe={recipe} variant="basic" />
              ))}
            </div>
          }

          {state == "Saved" &&
            <div className="list-recipes-container">
            {savedRecipes.map((recipe) => (
              <RecipeCard recipe={recipe} variant="basic" />
            ))}
            </div>
          }
        </div>
      </>
  )
}
