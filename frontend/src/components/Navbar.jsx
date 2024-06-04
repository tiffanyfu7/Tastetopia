import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ORANGE } from "../main";

//add current page prop
export const Navbar = ({ searchPlaceholder }) => {

  const styles= {
    navbarContainer: {
      backgroundColor: "white",
      height: "80px",
      width: "100%"
    },
    navbarLink: {
      textDecoration: "none",
      fontWeight: "800",
      display: "inline-block",
      color: ORANGE,
      marginRight: "70px",
      fontSize: "18px"
    }
  };
  
  return (
    <>
      <div style={styles.navbarContainer} className="navbarContainer">
        <Link style={styles.navbarLink} to={"/"}>Home</Link>
        <Link style={styles.navbarLink} to={"/Recipes"}>Recipes</Link>
        <Link style={styles.navbarLink}>
          <SearchBar placeholder={searchPlaceholder} />
        </Link>
        <Link style={styles.navbarLink} to={"/YourCookbook"}>Your Cookbook</Link>
        <Link style={styles.navbarLink} to={"/Profile"}>Profile</Link>
      </div>
    </>
  );
};
