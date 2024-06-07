import { Rating, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoSearch, IoAddOutline, IoBookOutline } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { Card, CardBody, Image } from '@chakra-ui/react'
import '../styles/Homepage.css'
import axios from 'axios'

const HomepageCards = ({ cardInfo, variant }) => {
    const [recipe, setRecipe] = useState(null);

    const fetchRecipe = async () => {
        await axios.get(`http://localhost:8000/recipe/${cardInfo.id}`)
            .then((r) => { console.log(r.data); setRecipe(r.data) });
    }

    useEffect(() => {
        if (variant == "daily") {
            fetchRecipe();
        }
    }, []);
    
    let icon;
    if (variant == "quickLink") {
        if (cardInfo.link == "/Recipes") {
            icon = <IoSearch size={45} style={{marginTop: "-15px"}}/>
        } else if (cardInfo.link == "/Create") {
            icon = <IoAddOutline size={65} style={{marginTop: "-22px"}}/>
        } else {
            icon = <IoBookOutline size={55} style={{marginTop: "-15px"}} />
        }
    }

    return (
        <>
            {variant == "quickLink" && icon &&
                <Link className="link" to={cardInfo.link}>
                    <div className="quick-link-card card">
                        <img className="quick-link-image" src={cardInfo.image} alt={cardInfo.title}/>
                        <div className="quick-link-info">
                            <p>{cardInfo.motto}</p>
                            {icon}
                        </div>
                    </div>
                </Link>
            }

            {variant == "daily" && recipe &&
                <div className="daily-card card">
                    <img className="daily-card-image" src={recipe.image} alt={recipe.title} />
                    <div className="daily-card-info">
                        <p>{recipe.category}</p>    
                        <h4>Recipe of The Day</h4>
                        <h2>{recipe.title}</h2>
                        <p>By {recipe.author}</p>
                        <Rating name="half-rating-read" defaultValue={recipe.rating} precision={0.5} readOnly />
                    </div>
                </div>
            }

            {/* cardInfo = {category: "Lunch", recipe: recipe object} */}
        </>
  )
}

export default HomepageCards