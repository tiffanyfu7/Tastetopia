import React, { useEffect, useState } from 'react'
import '../styles/Profile.css'
import RecipeCard from './RecipeCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminVerification = () => {
    const [recipes, setRecipes] = useState(null);
    const navigate = useNavigate();

    const fetchRecipes = async () => {
        const response = await axios.get("http://localhost:8000/recipe");
        console.log(response.data);
        setRecipes(response.data);
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleCardClick = (recipe) => {
        navigate(`/Recipes/${recipe.id}`);
    };

    return (
        <div>
            <h1 className="title">Verify Recipes</h1>
            <div className="verify-cards-container">
                {recipes &&
                    recipes.map((recipe, i) => (
                        recipe.verified == false ?
                            <RecipeCard
                                key={i}
                                recipe={recipe}
                                variant="basic"
                                onClick={() => handleCardClick(recipe)}
                            /> : null
                    ))
                }
            </div>
        </div>
    )
}

export default AdminVerification