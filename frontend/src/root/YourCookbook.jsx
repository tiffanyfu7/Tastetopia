import React, { useState, useEffect, useContext } from 'react';
import { Navbar } from "../components/Navbar";
import '../styles/Cookbook.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import RecipeCard from '../components/RecipeCard';
import { QueryContext } from '../components/QueryContext';
import { fetchCreatedRecipes } from '../components/fetchRecipes';
import { useAuth } from '../components/AuthContext.jsx';
import { RecipeContext } from "../components/RecipeContext.jsx";
import axios from 'axios';


export const YourCookbook = () => {
    const [state, setState] = useState("Created");
    const { setRecipe } = useContext(RecipeContext);
    const { setSearchRequested } = useContext(QueryContext);
    const [createdRecipes, setCreatedRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const { currentUser } = useAuth()
    const [userData, setUserData] = useState(null);
    const [fetchedUser, setFetchedUser] = useState(false);
    const navigate = useNavigate();

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8000/profile/user/${currentUser.uid}`)
        // console.log("hello", response.data);
        setUserData(response.data);
    }

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
        fetchUser();
        setFetchedUser(true);
    }, [currentUser, navigate]);

    //add query in fetchCreatedRecipes to only get the ids that match userData.createdRecipes
    useEffect(() => {
        if (fetchedUser && userData) {
            const fetchRecipes = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/cookbook/get-all/${currentUser.uid}`)   ;
                    setCreatedRecipes(response.data.createdRecipes);
                    setSavedRecipes(response.data.savedRecipes);
                } catch (error) {
                    console.log('Error fetching user created and saved: ', error);
                }
            }

            fetchRecipes();
        }
    }, [fetchedUser, userData]);

    const handleSearchSubmit = () => {
        setSearchRequested(true);
    };

    const handleCardClick = (recipeId) => {
        navigate(`/RecipeDetail/${recipeId}`);
    };

    return (
        <>
            <Navbar current="YourCookbook" onSearchSubmit={handleSearchSubmit} />
            {userData &&
                <div className="page-container cookbook-page">
                    <div className="profile-info">
                        <img
                            id="profile-pic"
                            src={userData.profilePictureUrl}
                            alt="profile-picture"
                        />
                        <p id="profile-username">{userData.name}</p>
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
                                <RecipeCard 
                                    key={recipe.id} 
                                    recipe={recipe} 
                                    variant="basic"
                                    onClick={() => handleCardClick(recipe.id)}
                                />
                            ))}
                        </div>
                    }
                    {state === "Saved" &&
                        <div className="list-recipes-container">
                            {savedRecipes.map((recipe) => (
                                <RecipeCard 
                                    key={recipe.id} 
                                    recipe={recipe} 
                                    variant="basic"
                                    onClick={() => handleCardClick(recipe.id)}
                                />
                            ))}
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default YourCookbook;
