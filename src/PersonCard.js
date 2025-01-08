import styles from './App.module.css';
import PersonData from './PersonData';
function personCard({searchQuery, filteredData}) {
    return(
    <div className={styles.personList}>
          {filteredData.length > 0 ? (
            filteredData.map((movie) => (
              <div key={movie.id} className={styles.personItem}>
              </div>
            ))
          ) : (
            <h4 className={styles.noResults}>{searchQuery.trim()===""?"No search results":""}</h4>
          )}
     </div>
    ) 
}
export default personCard;