import React, { useState } from "react";
import styles from "./App.module.css";

const Filters = ({ onFiltersChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [rating, setRating] = useState(0);

  const genres = ["Action", "Drama", "Thriller"];
  const languages = ["Telugu", "Hindi", "Tamil"];

  const toggleSelection = (item, setSelected, selected) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
  const toggleLanguageSelection = (item, setSelected, selected) => {
    if (selected.includes(item)) {
      setSelected([]);
    } else {
      setSelected(item);
    }
  }
  const handleRatingChange = (e) => {
    setRating(e.target.value);
    onFiltersChange({ genres: selectedGenres, languages: selectedLanguages, rating: e.target.value });
  };

  const handleGenreClick = (genre) => {
    toggleSelection(genre, setSelectedGenres, selectedGenres);
    onFiltersChange({ genres: [...selectedGenres, genre], languages: selectedLanguages, rating });
  };

  const handleLanguageClick = (language) => {
    toggleLanguageSelection(language, setSelectedLanguages, selectedLanguages);
    onFiltersChange({ genres: selectedGenres, languages: [...selectedLanguages, language], rating });
  };

  return (
    <div className={styles.filters}>
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
    </div>
  );
};

export default Filters;
