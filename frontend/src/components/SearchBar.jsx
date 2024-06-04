import React, { useEffect } from 'react'
import { IoIosSearch } from "react-icons/io";

const SearchBar=({ placeholder })=> {
    const styles= {
        container: {
            display: "flex",
            backgroundColor: "white",
            border: "1px solid black",
            borderRadius: "25px",
            width: "800px",
            height: "50px",
            verticalAlign: "middle"
        },
        searchIcon: {
            margin: "10px 0px 0px 20px"
        },
        input: {
            background: "transparent",
            border: "none",
            fontSize: "18px",
            color: "black",
            width: "700px",
            height: "50px",

            "&:focus": {
                outline: "none"
            }
        }
    };

    // useEffect (()=> {console.log(input)}, [input]);

    return (
        <div className="container" style={styles.container}>
            <IoIosSearch className="search-icon" style={styles.searchIcon} size={30} />
            <input type="text" placeholder={placeholder} style={styles.input}>
            {/* onChange= { (e)=> setInput(e.target.value) } */}
            </input>
        </div>
    )
}

export default SearchBar