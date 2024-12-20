import styles from './App.module.css';
import PersonData from './PersonData';
function personCard({searchQuery, filteredData, isSearched}) {
    return(
    <div className={styles.personList}>
          {filteredData.length > 0 ? (
            filteredData.map((person) => (
              <div key={person.id} className={styles.personItem}>
                <PersonData person={person} />
              </div>
            ))
          ) : (
            <h4 className={styles.noResults}>{searchQuery.trim()===""?"No search results":""}</h4>
          )}
     </div>
    ) 
}
export default personCard;