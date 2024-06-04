import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div>
        <header>
          <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/Recipes"}>Recipes</Link>
          </nav>

          
            <Link to={"/YourCookbook"}>Your Cookbook</Link>
            <Link to={"/Profile"}>Profile</Link>
          
        </header>
      </div>
    </>
  );
};
