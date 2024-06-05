import React, { useState, useEffect } from 'react'
import { IoIosSearch } from "react-icons/io";
import RecipeSearched from './RecipeSearched';
import { useNavigate } from 'react-router-dom';

const SearchBar=({ placeholder, width, onSearchSubmit })=> {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(input);
        setInput('');
        navigate(`/Recipes/q=${input}`);
    }
    
    const styles= {
        container: {
            display: "flex",
            backgroundColor: "white",
            border: "1px solid black",
            borderRadius: "25px",
            width: width,
            height: "50px",
            verticalAlign: "middle",
        },
        searchIcon: {
            margin: "10px 20px 0px 20px"
        },
        input: {
            background: "transparent",
            border: "none",
            fontSize: "18px",
            color: "black",
            width: "700px",
            height: "50px",

            "&:focus": {
                outline: "none"
            }
        }
    };

    return (
        <div className="container" style={styles.container}>
            <IoIosSearch className="search-icon" style={styles.searchIcon} size={30} />
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder={placeholder}
                    style={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}>
                </input>
            </form>
        </div>
    )
}

export default SearchBar