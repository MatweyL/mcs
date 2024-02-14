import React from 'react';
import classes from "./SearchBar.module.css";

const SearchBar = ({props}) => {
    return (
        <div className={classes.searchBar} >
            <input {...props} />
        </div>
    );
};

export default SearchBar;