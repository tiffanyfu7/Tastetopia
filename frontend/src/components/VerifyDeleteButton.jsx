import axios from 'axios';
import React, { useState } from 'react'


{/* 
Pass in RecipeId and Variant to Use

Verify:
<VerifyDeleteButton recipeId={recipe.id} variant="verify" />
Delete:
<VerifyDeleteButton recipeId={recipe.id} variant="delete"/> 

*/}

const VerifyDeleteButton = ({ recipeId, variant }) => {
    const [clicked, setClicked] = useState(false);

    const verifyRecipe = async () => {
        await axios.put(`http://localhost:8000/recipe/verify/${recipeId}`, {id: recipeId});
    }

    const deleteRecipe = async () => {
        await axios.put(`http://localhost:8000/recipe/delete/${recipeId}`, {id: recipeId});
    }

    const handleVerify = () => {
        if (confirm("Upload this Recipe to Tastetopia")) {
            verifyRecipe();
            setClicked(true);
            setTimeout(() => { window.location.reload() }, 1000);
        }
    }

    const handleDelete = () => {
        if (confirm("Remove this Recipe from Tastetopia")) {
            deleteRecipe();
            setClicked(true);
            setTimeout(() => { window.location.reload() }, 1000);
        }
    }

    return (
        <>
            {variant == "verify" ?
                (!clicked ?
                    <button onClick={() => handleVerify()}>Verify</button> :
                    <button style={{ backgroundColor: "green" }} disabled>Verified</button>
                ) : (!clicked ?
                    <button onClick={() => handleDelete()}>Delete</button> :
                    <button style={{ backgroundColor: "red" }} disabled>Deleted</button>
                )}
        </>
    )
}

export default VerifyDeleteButton