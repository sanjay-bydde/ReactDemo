import styles from'./App.module.css';
import React from 'react';
import {useState} from 'react';
import Filters from './Filters.js';
import SearchBox from './SearchBox.js';
import MovieDetails from './MovieDetails.js';
import axios from 'axios';


function Suggestions({ suggestions, searchBy, onSuggestionClick }) {
  // Function to get the appropriate movie property based on the selected searchBy
  const getMovieProperty = (movie, searchBy) => {
    switch (searchBy) {
      case "Movie Name":
        return movie.movieName;
      case "Director":
        return movie.director;
      case "Hero Name":
        return movie.cast.heroName;
      case "Producer":
        return movie.producer;
      case "Heroine":
        return movie.cast.heroineName;
      case "Villain":
        return movie.cast.villain;
      default:
        return '';
    }
  };

  return (
    <div className={styles.suggestions}>
      {suggestions.map((movie) => (
        <div
          key={movie.id}
          className={styles.suggestionItem}
          onClick={() => onSuggestionClick(getMovieProperty(movie, searchBy))}
        >
          {getMovieProperty(movie, searchBy)}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('Movie Name');
  const [searchedData, setSearchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearched, setSearched] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestedData, setSuggestedData] = useState([]);
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [searchByMovieName, setSearchByMovieName] = useState(true);
  const [searchByRating, setSearchByRating] = useState(false);
  const [suggestClick, setSuggestClick] = useState("");
  const [filters, setFilters] = useState({
    genres: [],
    languages: [],
    rating: 0,
  });

  const handleSearch = async () => {

    const trimmedSearchQuery = inputValue.trim();
    if (trimmedSearchQuery === '') {
      setSearchQuery(trimmedSearchQuery);
      setSearchedData([]);
      setSearched(true);
      return;
    }
    setSearchQuery(trimmedSearchQuery);
    const filteredData = await axios.get(`http://localhost:8080/movies/search?searchBy=${searchBy}&searchValue=${trimmedSearchQuery}`);
    setSearchedData(filteredData.data);
    setSearched(true);
    setIsEmailSelected(false);
  };
  const handleInputChange = async (e) => {
    const query = e.target.value;
    setInputValue(query);
    if (query.trim() === '') {
      setSuggestedData([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/movies/search?searchBy=${searchBy}&searchValue=${query.trim()}`);
      setSuggestedData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  const handleSuggestionClick = (email) => {
    setInputValue(email);
    setSuggestedData([]);
    setIsEmailSelected(true);
  };

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };
  
  const applyFilters = async (updatedFilters = filters) => {
    const { genres, languages, rating ,sort} = updatedFilters;
  
    try {
      const params = new URLSearchParams();
      if (genres.length > 0) {
        genres.forEach((genre) => params.append('genres', genre));
      }
      if (languages.length > 0) {
        languages.forEach((language) => params.append('languages', language));
      }
      if (rating) {
        params.append('rating', rating);
      }
  
      const response = await axios.get(`http://localhost:8080/movies/filters?${params.toString()}`);
      let data = response.data;
      if (sort === "releaseDate") {
        data = data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      } else if (sort === "rating") {
        data = data.sort((a, b) => b.rating - a.rating);
      }
      setFilteredData(data);
    } catch (error) {
      console.error('Error applying filters:', error);
      setFilteredData([]);
    }
  };
  const issearchByMovieName = () => {
    if(searchByMovieName === false)
    {
      setSearchByMovieName(true);
      setSearchByRating(false);
    }
  }
  const issearchByRating = () => {
    if(searchByRating === false)
    {
      setSearchByMovieName(false);
      setSearchByRating(true);
    }
  }
  const handleDropdownChange = (e) => {
    setSearchBy(e.target.value);
    setInputValue('');
    setSuggestedData([]);
  };
  return (
    <div>
        <h1 className={styles.AppHeader}>Search</h1>
        <div className={styles.Menu}>
          <p onClick={issearchByMovieName}>searchByMovieName</p>
          <p onClick={issearchByRating}> searchByRating</p>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.searchContainer} style={{ width: searchByMovieName ? '40%' : '40%' }}>
            {searchByMovieName                                                                                                 && 
            (
              <>
              <div style={{display:"flex", alignItems:"center"}}>
                <SearchBox value={inputValue} onChange={handleInputChange} onSearch={handleSearch} disabled={isEmailSelected}/>
                <select
                  value={searchBy}
                  onChange={handleDropdownChange}
                  className={styles.dropdown}
                >
                  <option value="Movie Name">Movie Name</option>
                  <option value="Director">Director</option>
                  <option value="Hero Name">Hero Name</option>
                  <option value="Producer">Producer</option>
                  <option value="Heroine">Heroine</option>
                  <option value="Villain">Villain</option>
                </select>
              </div>
                <div>
                  {suggestedData.length > 0 && (
                    <Suggestions 
                      suggestions={suggestedData}
                      searchBy={searchBy}
                        onSuggestionClick={handleSuggestionClick}
                    />
                  )}
                </div>
              </>
            )}
            {searchByRating &&
              <div>
                <Filters onFiltersChange={handleFiltersChange}/>
              </div> }
          </div>
        </div>
        {searchByMovieName && searchedData.length > 0 && <MovieDetails movies={searchedData} />}
        {searchByRating && filteredData.length > 0 && <MovieDetails movies={filteredData} />}

    </div>
  );
}

export default App;
