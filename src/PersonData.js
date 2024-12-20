import styles from './App.module.css';
function PersonData({person}) {
    return (
        <div >
                <img
                  className={styles.personImage}
                  src={person.profileImage}
                  alt="Profile"
                />
                <h2 className={styles.personName}>Name: {person.name}</h2>
                <p className={styles.personEmail}>Email: {person.email}</p>
                <img
                  className={styles.carImage}
                  src={person.carImage}
                  alt="Car"
                />
        </div>
    );
  }
  export default PersonData;