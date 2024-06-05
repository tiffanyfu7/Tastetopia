import React, { useContext } from 'react'
import { Navbar } from "../components/Navbar";
import { QueryContext } from '../components/QueryContext';
import '../styles/Profile.css'
import AdminVerification from '../components/AdminVerification';
import UserNotifications from '../components/UserNotifications';

export const Profile = () => {
  const { setSearchRequested } = useContext(QueryContext);

  const handleSearchSubmit = () => {
    setSearchRequested(true);
  }

  // replace with current user info using authcontext
  const user = {
    username: "Admin",
    bio: "Hi! I'm Guy Fieri, Admin of Tastetopia",
    isAdmin: true,
    img: "https://s.yimg.com/ny/api/res/1.2/UFEmshGURUmfNITX1KC5qw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTU1NQ--/https://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/3163b5d7bf142b93a00ed75f49b6951c",
  }

  return (
    <>
      <Navbar current="Profile" onSearchSubmit={handleSearchSubmit}/>
      <div className="page-container profile-page">

        <div className="profile-info-card">
          <img
            id="profile-pic"
            src={user.img}
            alt="profile-picture"
          /> 
          <p id="profile-username">{user.username}</p>
          <p>{user.bio}</p>
          <button id="logout-button">Logout</button>
        </div>

        <div className="side-panel">
          {user.isAdmin ?
            <AdminVerification /> :
            <UserNotifications />
          }
        </div>

      </div>
  </>
  )
}
