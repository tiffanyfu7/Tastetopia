import React from 'react'
import { Navbar } from "../components/Navbar";

export const YourCookbook = () => {
  return (
      <>
        <Navbar current="YourCookbook" />
        <div className="page-container">
          <h1>Your Cookbook</h1>
        </div>
      </>
  )
}
