import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';
import axios from 'axios';
import '../styles/CreateRecipe.css';

export const CreateRecipe = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [totalTime, setTotalTime] = useState('');
    const [yieldAmount, setYieldAmount] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [dietLabels, setDietLabels] = useState('');
    const [healthLabels, setHealthLabels] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [instructions, setInstructions] = useState('');
    const [calories, setCalories] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');

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
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let imageUrl = null;
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
    
            try {
                const response = await axios.post('http://localhost:8000/createRecipe/uploadImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                imageUrl = response.data.imageUrl;
            } catch (error) {
                console.error('Error uploading image: ', error);
                return;
            }
        }
    
        try {

            const recipeData = {
                title,
                author,
                image: imageUrl,
                totalTime: Number(totalTime),
                yield: Number(yieldAmount),
                cuisineType: cuisineType.split(',').map(type => type.trim()),
                dietLabels: dietLabels.split(',').map(label => label.trim()),
                healthLabels: healthLabels.split(',').map(label => label.trim()),
                ingredients: ingredients.map(ingredient => `${ingredient.name}: ${ingredient.quantity}`),
                instructions: instructions.split('.').map(instr => instr.trim()),
                calories: Number(calories),
                fat: Number(fat),
                carbs: Number(carbs),
                protein: Number(protein),
                avgRating: 0,
                reviews: {},
                uri: null,
                verified: false,
            };

            console.log(recipeData);
            const recipeResponse = await axios.post(`http://localhost:8000/createRecipe/${currentUser.uid}`, recipeData);
    
            console.log('Recipe submitted:', recipeResponse.data);
    
            setTitle('');
            setAuthor('');
            setImage(null);
            setTotalTime('');
            setYieldAmount('');
            setCuisineType('');
            setDietLabels('');
            setHealthLabels('');
            setIngredients([{ name: '', quantity: '' }]);
            setInstructions('');
            setCalories('');
            setFat('');
            setCarbs('');
            setProtein('');
    
            navigate('/YourCookbook');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <>
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
        <h1 style={{margin: "-30px auto 15px auto", textAlign: "center"}}>Create Recipe</h1>
        <div>
            <form onSubmit={handleSubmit} style={{display: "block"}}>
                <div className="create-recipe-container">  
                    <div className="form-section">
                        <div className="form-group">
                            <label htmlFor="photo">Add Photo</label>
                            <input 
                                type="file" 
                                id="photo" 
                                onChange={handlePhotoChange} 
                            />
                            {image && <p>{image.name}</p>}
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" placeholder="Ex. Chicken Alfredo" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input type="text" placeholder="Ex. Omar Hashi" value={author} onChange={(e) => setAuthor(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Total Time (minutes)</label>
                            <input type="number" placeholder="Ex. 30" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Yield</label>
                            <input type="number" placeholder="Ex. 4" value={yieldAmount} onChange={(e) => setYieldAmount(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Cuisine Type (comma-separated)</label>
                            <input type="text" placeholder="Ex. Italian, Mexican" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Diet Labels (comma-separated)</label>
                            <input type="text" placeholder="Ex. Halal, Vegan" value={dietLabels} onChange={(e) => setDietLabels(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Health Labels (comma-separated)</label>
                            <input type="text" placeholder="Ex. Gluten-Free, Dairy-Free" value={healthLabels} onChange={(e) => setHealthLabels(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-section ingredients-instructions-section">
                        <div className="form-group">
                            <div className="additional-info">
                                <div className="form-group">
                                    <label>Calories</label>
                                    <input type="number" placeholder="Ex. 800" value={calories} onChange={(e) => setCalories(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Fat (g)</label>
                                    <input type="number" placeholder="Ex. 20" value={fat} onChange={(e) => setFat(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Carbs (g)</label>
                                    <input type="number" placeholder="Ex. 50" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Protein (g)</label>
                                    <input type="number" placeholder="Ex. 30" value={protein} onChange={(e) => setProtein(e.target.value)} />
                                </div>
                            </div> 
                            <label>Ingredients</label>
                            <div className="ingredients-list">
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="ingredient-input">
                                        <input
                                            type="text"
                                            placeholder="Ingredient"
                                            name="name"
                                            value={ingredient.name}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        required/>
                                        <input
                                            type="text"
                                            placeholder="Quantity"
                                            name="quantity"
                                            value={ingredient.quantity}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        required/>
                                        <button type="button" onClick={() => handleDeleteIngredient(index)} className="delete-button">Delete</button>
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddIngredient} className="add-ingredient-button">Add new ingredient</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Instructions (period-separated)</label>
                            <textarea
                                placeholder="Ex. Step 1. Step 2. Step 3."
                                value={instructions}
                                rows="9"    
                                onChange={(e) => setInstructions(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div> 
                <div style={{textAlign: "center"}}>  
                    <button type="submit" className="submit-button">Submit Recipe</button>
                </div>  
            </form>
            </div>
        </>
    );
};

export default CreateRecipe;
