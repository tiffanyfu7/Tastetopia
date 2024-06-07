import React from 'react'
import '../styles/Profile.css'
import { useNavigate } from 'react-router-dom';
import { ORANGE } from '../main';

const UserNotifications = () => {
    const navigate = useNavigate();

    const notifications = [
    // {
    //     string: "New Comment on Your Recipe ",
    //     author: "",
    //     title: "Chicken Noodle Soup",
    //     id: "",
    // },
        {
        string: "New Recipe From ",
        author: "Omar Hashi ",
        title: "Chicken Alfredo",
        id: "eqdaRU2sTcClcrrGgvWA",
    }]
    
    const handleClick = (recipeId) => {
        navigate(`/Recipes/detail/${recipeId}`);
    }

    const styles = {
        container: {
            margin: "10px",
            height: "40px",
            borderRadius: "15px",
            backgroundColor: "white",

            "&:hover": {
                backgroundColor: "#b3b3b3",
            }
        },
        dot: {
            backgroundColor: ORANGE,
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            display: "inline-block",
            margin: "14px 15px 2px 20px"
        },
        text: {
            fontSize: "16px",
            margin: "0px",
            paddingTop: "0px",
            verticalAlign: "middle",
            fontWeight: "400"
        }
    }

    return (
        <div>
            <h1 className="title">Notifications</h1>
            {notifications.map((n) => (
                <div onClick={() => handleClick(n.id)} style={styles.container} className="card">
                    <h5 style={styles.text}><span style={styles.dot}></span>{n.string} {n.author} "{n.title}"</h5>
                </div>
            ))}
        </div>
    )
}

export default UserNotifications