import React, { useState } from 'react';
import styles from "./SearchInput.module.css";
import searchIcon from '../../../assets/icons/searchIcon.svg';

const SearchInput = ({ onInputChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onInputChange(value); // Pass the input value to the parent component
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <div className={styles.searchIconContainer}>
        <img src={searchIcon} alt="Search" className={styles.searchIcon} />
      </div>

    </div>
  );
};

export default SearchInput;
