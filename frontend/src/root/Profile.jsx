import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from "../components/Navbar";
import { QueryContext } from '../components/QueryContext';
import '../styles/Profile.css'
import AdminVerification from '../components/AdminVerification';
import UserNotifications from '../components/UserNotifications';
import { UserContext } from '../components/UserContext.jsx';
import axios from 'axios';

export const Profile = () => {
  const { setSearchRequested } = useContext(QueryContext);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  //Guy's Doc ID for Testing
  const testid = "YOw23Mz104aya7OEouj34VqGanY2";

  const fetchUser = async () => {
    const response = await axios.get(`http://localhost:8000/profile/user/${testid}`)
    // const response = await axios.get(`http://localhost:8000/profile/user/${user.uid}`)
    setUserData(response.data);
    console.log('response.data', response.data)
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearchSubmit = (query) => {
    setSearchRequested(query);
  }

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
              <button id="logout-button">Logout</button>
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