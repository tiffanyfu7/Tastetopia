import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ORANGE, LIGHTGREEN } from "../main";

export const Navbar = ({ current }) => {

  const styles= {
    navbarContainer: {
      backgroundColor: "white",
      height: "75px",
      width: "100%",
      position: "fixed",
      top: "0",
      zIndex: "9999"
    },
    navbarLink: {
      verticalAlign: "middle",
      padding: "12px 15px 0px 15px",
      textDecoration: "none",
      fontWeight: "800",
      display: "inline-block",
      color: ORANGE,
      marginRight: "3%",
      fontSize: "18px"
    },
    currentLink: {
      verticalAlign: "middle",
      padding: "10px 15px 10px 15px",
      textDecoration: "none",
      fontWeight: "800",
      display: "inline-block",
      color: ORANGE,
      marginTop: "12px",
      marginRight: "3%",
      fontSize: "18px",
      backgroundColor: LIGHTGREEN,
      borderRadius: "40px",
    }
  };
  
  return (
    <>
      <div style={styles.navbarContainer} className="navbarContainer">
        <nav>
          <Link style={current == "Home" ? styles.currentLink : styles.navbarLink} to={"/"}>Home</Link>
          <Link style={current == "Recipes" ? styles.currentLink : styles.navbarLink} to={"/Recipes"}>Recipes</Link>
          <Link style={styles.navbarLink} to={"/Recipes"}>
            <SearchBar placeholder="Search Tastropica Recipes..." width="700px"/>
          </Link>
          <Link style={current == "YourCookbook" ? styles.currentLink : styles.navbarLink} to={"/YourCookbook"}>Your Cookbook</Link>
          <Link style={current == "Profile" ? styles.currentLink : styles.navbarLink} to={"/Profile"}>Profile</Link>
        </nav>
      </div>
    </>
  );
};
