import styles from'./App.module.css';
import data from './Data.js';
import React from 'react';
import {useState} from 'react';
import PersonCard from './PersonCard';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSearched, setSearched] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestedData, setSuggestedData] = useState([]);
  const handleSearch = () => {

    const trimmedSearchQuery = inputValue.trim();
    if (trimmedSearchQuery === '') {
      setSearchQuery(trimmedSearchQuery);
      setFilteredData([]);
      setSearched(true);
      return;
    }
    setSearchQuery(trimmedSearchQuery); // Update the searchQuery
    const filteredData = data.filter((person)=>person.email.toLowerCase().startsWith(trimmedSearchQuery.toLowerCase()));
    setFilteredData(filteredData);
    setSearched(true);
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query); // Always update the input value
    if (query.trim() === '') {
      setSuggestedData([]); // Clear suggestions if input is empty
      return;
    }

    // Dynamically suggest matching data
    const suggestions = data.filter((person) =>
      person.email.toLowerCase().startsWith(query.trim().toLowerCase())
    );
    setSuggestedData(suggestions);
  };
  const handleSuggestionClick = (email) => {
    setInputValue(email); // Set input to selected suggestion
    setSuggestedData([]); // Clear suggestions on selection
  };
  return (
    <div>
      <header >
        <h1 className={styles.AppHeader}>Search</h1>
      </header>
        <div className={styles.inputContainer}>
          <input className={styles.searchInput} 
                  type="text" placeholder="Search" 
                  value={inputValue} onChange={handleInputChange} />

          <button className={styles.searchButton} onClick={handleSearch}>
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
            <div className={styles.suggestions}>
              {suggestedData.map((person) => (
                <div
                  key={person.id}
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(person.email)}
                >
                  {person.email}
                </div>
              ))}
            </div>
          )}
        </div>
        {isSearched && (<PersonCard searchQuery={searchQuery} filteredData={filteredData} isSearched={isSearched} />)}
    </div>
  );
}

export default App;
