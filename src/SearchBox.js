import styles from './App.module.css';

function SearchBox(props){
    return(
        <div className={styles.searchResults}>
              <input className={styles.searchInput} 
                      type="text" placeholder="Search" 
                      value={props.value} onChange={props.onChange} />

              <button className={styles.searchButton} 
                      onClick={props.onSearch}
                      disabled={!props.disabled}  >
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
    );
}

export default SearchBox;