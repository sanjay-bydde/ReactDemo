import styles from'./App.module.css';
import data from './Data.js';
import React from 'react';
import {useState} from 'react';
import Filters from './Filters.js';
import axios from 'axios';


function Suggestions({ suggestions, onSuggestionClick }) {
  return (
    <div className={styles.suggestions}>
      {suggestions.map((movie) => (
        <div
          key={movie.id}
          className={styles.suggestionItem}
          onClick={() => onSuggestionClick(movie.movieName)}
        >
          {movie.movieName}
        </div>
      ))}
    </div>
  );
}
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSearched, setSearched] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestedData, setSuggestedData] = useState([]);
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [filters, setFilters] = useState({
    genres: [],
    languages: [],
    rating: 0,
  });

  const handleSearch = async () => {

    const trimmedSearchQuery = inputValue.trim();
    if (trimmedSearchQuery === '') {
      setSearchQuery(trimmedSearchQuery);
      setFilteredData([]);
      setSearched(true);
      return;
    }
    setSearchQuery(trimmedSearchQuery); // Update the searchQuery
    const filteredData = await axios.get(`http://localhost:8080/movies/byName?movieName=${trimmedSearchQuery}`);
    setFilteredData(filteredData.data);
    setSearched(true);
    setIsEmailSelected(false);
  };
  const handleInputChange = async (e) => {
    const query = e.target.value;
    setInputValue(query); // Always update the input value
    if (query.trim() === '') {
      setSuggestedData([]); // Clear suggestions if input is empty
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/movies/byName?movieName=${query.trim()}`);
      setSuggestedData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  const handleSuggestionClick = (email) => {
    setInputValue(email); // Set input to selected suggestion
    setSuggestedData([]); // Clear suggestions on selection
    setIsEmailSelected(true); // Mark email as selected

  };

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
    applyFilters(filteredData, updatedFilters);
  };

  const applyFilters = (movies, updatedFilters = filters) => {
    const { genres, languages, rating } = updatedFilters;

    const filteredMovies = movies.filter((movie) => {
      const matchesGenre =
        genres.length === 0 || genres.includes(movie.genre);
      const matchesLanguage =
        languages.length === 0 || languages.includes(movie.language);
      const matchesRating = movie.rating >= rating;

      return matchesGenre && matchesLanguage && matchesRating;
    });

    setFilteredData(filteredMovies);
  };

  return (
    <div>
        <h1 className={styles.AppHeader}>Search</h1>
        <div className={styles.Menu}>
          <p>searchByMovieName</p>
          <p>searchByRating</p>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.searchResults}>
              <input className={styles.searchInput} 
                      type="text" placeholder="Search" 
                      value={inputValue} onChange={handleInputChange} />

              <button className={styles.searchButton} 
                      onClick={handleSearch}
                      disabled={!isEmailSelected}  >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#eeeff1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001a1 1 0 0 0-.047.047l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.047-.047zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
                    fill="#eeeff1"
                  />
                </svg>
              </button>
            </div>
            <div>
              {suggestedData.length > 0 && (
                <Suggestions
                  suggestions={suggestedData}
                    onSuggestionClick={handleSuggestionClick}
                />
              )}
            </div>
            <div>
              <Filters onFiltersChange={handleFiltersChange}/>
            </div> 
              
          </div>
          {/* {isSearched&&
          <div className={styles.Details}>
            {isSearched && <h2>Search Results:</h2>}
            {isSearched && filteredData.length > 0 ? (
            filteredData.map((movie) => (
              console.log(movie),
              <div key={movie.id} >
                <p> Movie Name:{movie.movieName}</p>
                <p>Budget:{movie.budget}</p>
                <p>Release Date:{movie.releaseDate}</p>
                <p>Collections:{movie.collections}</p>
                <p>Director:{movie.director}</p>
                <p>Producer:{movie.producer}</p>
                <h1>Cast:</h1>
                <p>Hero Name: {movie.cast.heroName}</p>
                <p>Heroine Name: {movie.cast.heroineName}</p>
                <p>Villain Name: {movie.cast.villain}</p>
              </div>
            ))
          ) :""}
          </div>}
          <div>
            {isSearched && (<PersonCard searchQuery={searchQuery} filteredData={filteredData} isSearched={isSearched} />)}
          </div> */}
          
          
        </div>

       
        
    </div>
  );
}

export default App;
