import React, { useState } from "react";
import styles from "./App.module.css";

const Filters = ({ onFiltersChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [rating, setRating] = useState(0);
  const [sortOption, setSortOption] = useState(""); 
  const [isSortVisible, setIsSortVisible] = useState(false);

  const genres = ["Action", "Drama", "Thriller"];
  const languages = ["Telugu", "Hindi", "Tamil"];

  const updateFilters = (updatedGenres, updatedLanguages, updatedRating,updatedSortOption) => {
    onFiltersChange({
      genres: updatedGenres,
      languages: updatedLanguages,
      rating: updatedRating,
      sort:updatedSortOption
    });
  };

  const handleGenreClick = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    updateFilters(updatedGenres, selectedLanguages, rating);
  };

  const handleLanguageClick = (language) => {
    const updatedLanguages = selectedLanguages.includes(language) ? [] : [language];
    setSelectedLanguages(updatedLanguages);
    updateFilters(selectedGenres, updatedLanguages, rating);
  };

  const handleRatingChange = (e) => {
    const updatedRating = parseInt(e.target.value, 10);
    setRating(updatedRating);
    updateFilters(selectedGenres, selectedLanguages, updatedRating);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    updateFilters(selectedGenres, selectedLanguages, rating, option);
  };

  const toggleSortOptions = () => {
    setIsSortVisible(!isSortVisible);
  }

  return (
  <div className={styles.filtersContainer}>
    <div className={styles.sortBy}>
        <button className={styles.sortButton} onClick={toggleSortOptions}>Sort by</button>
        {isSortVisible && (
          <div className={styles.sortOptions}>
            <button
              className={`${styles.sortOption} ${sortOption === "releaseDate" ? styles.active : ""}`}
              onClick={() => handleSortChange("releaseDate")}
            >
              Release Date
            </button>
            <button
              className={`${styles.sortOption} ${sortOption === "rating" ? styles.active : ""}`}
              onClick={() => handleSortChange("rating")}
            >
              Rating
            </button>
          </div>
        )}
      </div>
    <div className={styles.filters}>
      <div className={styles.filterSection}>
        <h3>Rating</h3>
        <input
          type="range"
          min="0"
          max="10"
          value={rating}
          className={styles.slider}
          onChange={handleRatingChange}
        />
        <span>{rating}</span>
      </div>
      <div className={styles.filterSection}>
        <h3>Genre</h3>
        <div className={styles.buttons}>
          {genres.map((genre) => (
            <button
              key={genre}
              className={`${styles.filterButton} ${selectedGenres.includes(genre) ? styles.active : ""}`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.filterSection}>
        <h3>Language</h3>
        <div className={styles.buttons}>
          {languages.map((language) => (
            <button
              key={language}
              className={`${styles.filterButton} ${selectedLanguages.includes(language) ? styles.active : ""}`}
              onClick={() => handleLanguageClick(language)}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Filters;
