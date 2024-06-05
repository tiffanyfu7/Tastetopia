import React, { useState, useEffect, useContext } from 'react';
import { Navbar } from "../components/Navbar";
import '../styles/Cookbook.css';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import RecipeCard from '../components/RecipeCard';
import { QueryContext } from '../components/QueryContext';
import { fetchCreatedRecipes } from '../components/fetchRecipes';

export const YourCookbook = () => {
    const [state, setState] = useState("Created");
    const { setSearchRequested } = useContext(QueryContext);
    const [createdRecipes, setCreatedRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const getCreatedRecipes = async () => {
            const recipes = await fetchCreatedRecipes();
            setCreatedRecipes(recipes);
        };
        getCreatedRecipes();
    }, []);

    const handleSearchSubmit = () => {
        setSearchRequested(true);
    };

    return (
        <>
            <Navbar current="YourCookbook" onSearchSubmit={handleSearchSubmit} />
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
                        style={{ textDecoration: state === "Created" ? "underline" : "" }}
                    > Created </button>
                    <button className="toggle-button"
                        onClick={() => setState("Saved")}
                        style={{ textDecoration: state === "Saved" ? "underline" : "" }}
                    >Saved</button>
                </div>
                {state === "Created" &&
                    <div className="list-recipes-container">
                        <div id="create-new-card">
                            <Link id="create-button" to="/CreateRecipe">
                                <IoAddOutline size={100} />
                            </Link>
                            <p id="create-new-text">Create New Recipe</p>
                        </div>
                        {createdRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} variant="basic" />
                        ))}
                    </div>
                }
                {state === "Saved" &&
                    <div className="list-recipes-container">
                        {savedRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} variant="basic" />
                        ))}
                    </div>
                }
            </div>
        </>
    );
};

export default YourCookbook;
