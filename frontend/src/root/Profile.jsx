import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from "../components/Navbar";
import { QueryContext } from '../components/QueryContext';
import '../styles/Profile.css'
import AdminVerification from '../components/AdminVerification';
import UserNotifications from '../components/UserNotifications';
import { UserContext } from '../components/UserContext.jsx';
import { useAuth } from '../components/AuthContext.jsx';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Profile = () => {
  const { setSearchRequested } = useContext(QueryContext);
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  //Guy's Doc ID for Testing
  const testid = "YOw23Mz104aya7OEouj34VqGanY2";

  const fetchUser = async () => {
    // const response = await axios.get(`http://localhost:8000/profile/user/${testid}`)
    const response = await axios.get(`http://localhost:8000/profile/user/${currentUser.uid}`)
    setUserData(response.data);
    console.log('response.data', response.data)
  }
  
  useEffect(() => {
    if (!currentUser) {
        navigate('/'); // Redirect to login if not authenticated
    }
    fetchUser();
}, [currentUser, navigate]);

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  const handleSearchSubmit = (query) => {
    setSearchRequested(query);
  }

  const handleLogout = async () => {
    try {
        await logout();
        navigate('/');
    } catch (error) {
        console.log("Failed to log out", error);
    }
  };

  return (
    <>
      <Navbar current="Profile" onSearchSubmit={handleSearchSubmit} />
      {userData &&
        <div className="page-container profile-page">
            <div className="profile-info-card">
              <img
                id="profile-pic"
                src={userData.profilePictureUrl}
                alt="profile-picture"
              /> 
              <p id="profile-username">{userData.name}</p>
              <p>{userData.bio}</p>
              <button id="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="side-panel">
              {userData.isAdmin ?
                <AdminVerification /> :
                <UserNotifications />
              }
            </div>
        </div>
      }
  </>
  )
}