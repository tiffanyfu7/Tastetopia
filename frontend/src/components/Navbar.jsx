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
            <Link to={"/Profile"}>Profile</Link>
            <Link to={"/Recipes"}>Recipes</Link>
            <Link to={"/YourCookbook"}>YourCookbook</Link>
          </nav>
        </header>
      </div>
    </>
  );
};
