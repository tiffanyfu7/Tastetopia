import React, { useState } from 'react';
import { RecipeContext } from './RecipeContext';

const RecipeProvider = ({ children }) => {
    const [recipe, setRecipe] = useState([]);
    const [onBackClick, setOnBackClick] = useState(null);

    return (
        <RecipeContext.Provider value={{ 
            recipe,
            onBackClick,
            setRecipe,
            setOnBackClick
        }}>
            {children}
        </RecipeContext.Provider>
    );
};

export { RecipeProvider };