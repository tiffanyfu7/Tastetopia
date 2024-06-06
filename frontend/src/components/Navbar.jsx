import React, { useContext, useEffect } from "react";
import { QueryContext } from "./QueryContext";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import '../styles/Navbar.css';
import { useMediaQuery } from '@chakra-ui/react';
import { IoAddOutline, IoBookOutline, IoHomeOutline, IoPerson, IoSearch, IoSearchOutline } from "react-icons/io5";

const DesktopNav = ({current, query, onSearchSubmit}) => {
  return (
    <>
      <div className="navbar-container">
        <nav>
          <Link className={current == "Home" ? "current-link" : "navbar-link"} to={"/Homepage"}>Home</Link>
          <Link className={current == "Recipes" ? "current-link" : "navbar-link"} to={`/Recipes/${query}`}>Recipes</Link>
          <div className="navbar-link" id="search-bar">
            <SearchBar placeholder="Search Tastetopia Recipes..." onSearchSubmit={onSearchSubmit}/>
          </div>
          <Link className={current == "YourCookbook" ? "current-link" : "navbar-link"} to={"/YourCookbook"}>Your Cookbook</Link>
          <Link className={current == "Profile" ? "current-link" : "navbar-link"} to={"/Profile"}>Profile</Link>
        </nav>
      </div>
    </>
  );
}

const MobileNav = ({current, query, onSearchSubmit}) => {
  return (
    <>
      <div className="mobile-navbar-container">
        <nav style={{margin: "auto"}}>
          <Link className={current == "Home" ? "mobile-current-link" : "mobile-navbar-link"} to={"/"}>
            <IoHomeOutline size={30} />
          </Link>
          <Link className={current == "Recipes" ? "mobile-current-link" : "mobile-navbar-link"} to={`/Recipes/${query}`}>
            <IoSearch size={30}/>
          </Link>
          <Link className={current == "CreateRecipe" ? "mobile-current-link" : "mobile-navbar-link"} to={`/CreateRecipe`}>
            <IoAddOutline size={43}/>
          </Link>
          <Link className={current == "YourCookbook" ? "mobile-current-link" : "mobile-navbar-link"} to={"/YourCookbook"}>
            <IoBookOutline size={30}/>
          </Link>
          <Link className={current == "Profile" ? "mobile-current-link" : "mobile-navbar-link"} to={"/Profile"}>
            <IoPerson size={30}/>
          </Link>
        </nav>
      </div>
    </>
  );
}

export const Navbar = ({ current, onSearchSubmit }) => {
  const { query, setQuery } = useContext(QueryContext);

  useEffect(() => {
    if (!query) {
      setQuery('q=');
    }
  }, [])

  const [isMobile] = useMediaQuery("(max-width: 900px)");
  
  return (
    <>
      {isMobile ? <MobileNav current={current} query={query} /> : <DesktopNav current={current} query={query} onSearchSubmit={onSearchSubmit} />}
    </>
  );
};
