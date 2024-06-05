import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateRecipe.css';


export const CreateRecipe = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [chefName, setChefName] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [timeToCook, setTimeToCook] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [servings, setServings] = useState('');
    const [caloriesPerServing, setCaloriesPerServing] = useState('');
    const [recipe, setRecipe] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [photo, setPhoto] = useState(null);

    const handleIngredientChange = (index, event) => {
        const values = [...ingredients];
        values[index][event.target.name] = event.target.value;
        setIngredients(values);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const handleDeleteIngredient = (index) => {
        const values = [...ingredients];
        values.splice(index, 1);
        setIngredients(values);
    };

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const recipeData = {
            title,
            chefName,
            cuisineType,
            timeToCook,
            dietaryRestrictions,
            servings,
            caloriesPerServing,
            recipe,
            ingredients,
            photo
        };
        console.log('Recipe submitted:', recipeData);
        setTitle('');
        setChefName('');
        setCuisineType('');
        setTimeToCook('');
        setDietaryRestrictions('');
        setServings('');
        setCaloriesPerServing('');
        setRecipe('');
        setIngredients([{ name: '', quantity: '' }]);
        setPhoto(null);
        navigate('/');
    };

    return (
        <div className="create-recipe">
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="left-section">
                        <div className="photo-section">
                            <input 
                                type="file" 
                                id="photo" 
                                style={{ display: 'none' }} 
                                onChange={handlePhotoChange} 
                            />
                            <button 
                                type="button" 
                                className="add-photo-button" 
                                onClick={() => document.getElementById('photo').click()}
                            >
                                +
                            </button>
                            <label>Add Photo</label>
                            {photo && <p>{photo.name}</p>}
                        </div>
                        <div className="details-section">
                            <label>Title</label>
                            <input type="text" placeholder="Ex. Chicken Alfredo" value={title} onChange={(e) => setTitle(e.target.value)} />
                            
                            <label>Chef Name</label>
                            <input type="text" placeholder="Ex. Omar Hashi" value={chefName} onChange={(e) => setChefName(e.target.value)} />
                            
                            <label>Cuisine Type</label>
                            <input type="text" placeholder="Ex. Italian" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
                            
                            <label>Time to Cook</label>
                            <input type="text" placeholder="Ex. 30 minutes" value={timeToCook} onChange={(e) => setTimeToCook(e.target.value)} />
                            
                            <label>Dietary Restrictions</label>
                            <input type="text" placeholder="Ex. Halal" value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} />
                            
                            <label>Servings</label>
                            <input type="text" placeholder="Ex. 4" value={servings} onChange={(e) => setServings(e.target.value)} />
                            
                            <label>Calories per Serving</label>
                            <input type="text" placeholder="Ex. 800" value={caloriesPerServing} onChange={(e) => setCaloriesPerServing(e.target.value)} />
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="ingredients-section">
                            <label>Ingredients</label>
                            <div className="ingredients-box">
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="ingredient-input">
                                        <input
                                            type="text"
                                            placeholder="Ingredient"
                                            name="name"
                                            value={ingredient.name}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Quantity"
                                            name="quantity"
                                            value={ingredient.quantity}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        />
                                        <button type="button" onClick={() => handleDeleteIngredient(index)} className="delete-button">Delete</button>
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddIngredient}>Add new ingredient</button>
                            </div>
                        </div>
                        <div className="recipe-section">
                            <label>Recipe</label>
                            <textarea
                                placeholder="Ex. Chicken Alfredo"
                                value={recipe}
                                onChange={(e) => setRecipe(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit">Submit Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;