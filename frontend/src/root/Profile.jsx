import React, { useContext } from 'react'
import { Navbar } from "../components/Navbar";
import { QueryContext } from '../components/QueryContext';

export const Profile = () => {
  const { setSearchRequested } = useContext(QueryContext);

  const handleSearchSubmit = (query) => {
    setSearchRequested(query);
  }

  return (
    <>
      <Navbar current="Profile" onSearchSubmit={handleSearchSubmit}/>
      <div className="page-container">
        <div>Profile</div>
      </div>
  </>
  )
}
