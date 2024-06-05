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
    image: "https://therecipecritic.com/wp-content/uploads/2022/05/blt-1.jpg",
    title: "The Perfect BLT",
    author: "Rich Brian",
    rating: 4.5,
    totalTime: 20,
    cuisineType: ["American"],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
  },{
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
    image: "https://therecipecritic.com/wp-content/uploads/2022/05/blt-1.jpg",
    title: "The Perfect BLT",
    author: "Rich Brian",
    rating: 4.5,
    totalTime: 20,
    cuisineType: ["American"],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
  },{
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
    image: "https://therecipecritic.com/wp-content/uploads/2022/05/blt-1.jpg",
    title: "The Perfect BLT",
    author: "Rich Brian",
    rating: 4.5,
    totalTime: 20,
    cuisineType: ["American"],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
  },{
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
    image: "https://therecipecritic.com/wp-content/uploads/2022/05/blt-1.jpg",
    title: "The Perfect BLT",
    author: "Rich Brian",
    rating: 4.5,
    totalTime: 20,
    cuisineType: ["American"],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
  },{
    image: "https://www.motherthyme.com/wp-content/uploads/2017/01/ROASTED-GARLIC-SPAGHETTI-3.jpg",
    title: "Garlic Pasta",
    author: "Jane Doe",
    rating: 4.5,
    totalTime: 30,
    cuisineType: ["Italian"],
    dietLabels: [""],
    healthLabels: [""],
    uri: null
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
            <p id="profile-username">Karen Smith</p>
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
              <p>Your Saved Recipes</p>
              
            </div>
          }
        </div>
      </>
  )
}
