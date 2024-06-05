import { Rating, Stack } from '@mui/material'
import React from 'react'
import { IoSearch, IoAddOutline, IoBookOutline } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { Card, CardBody, Image } from '@chakra-ui/react'
import '../styles/Homepage.css'

const HomepageCards = ({ cardInfo, variant }) => {
    
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
                <div className="quick-link-card card">
                    <img className="quick-link-image"src={cardInfo.image} alt={cardInfo.title}/>
                    <div className="quick-link-info">
                        <p>{cardInfo.motto}</p>
                        {icon}
                    </div>
                </div>
            }

            {variant == "daily" &&
                <div className="daily-card card">
                    <img className="daily-card-image" src={cardInfo.recipe.image} alt={cardInfo.recipe.title} />
                    <div className="daily-card-info">
                        <p>{cardInfo.category}</p>    
                        <h4>Recipe of The Day</h4>
                        <h2>{cardInfo.recipe.title}</h2>
                        <p>By {cardInfo.recipe.author}</p>
                        <Rating name="half-rating-read" defaultValue={cardInfo.recipe.rating} precision={0.5} readOnly />
                    </div>
                </div>
            }

            {/* cardInfo = {category: "Lunch", recipe: recipe object} */}
        </>
  )
}

export default HomepageCards