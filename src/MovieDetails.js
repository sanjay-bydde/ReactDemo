import React from 'react';
import styles from './App.module.css';

function MovieDetails({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className={styles.noResults}>No results found. Please try again!</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <h2>Search Results:</h2>
      <div className={styles.moviesList}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <h3 className={styles.movieTitle}>{movie.movieName}</h3>
            <div className={styles.movieInfo}>
              <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
              <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p><strong>Collections:</strong> ${movie.collections.toLocaleString()}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Producer:</strong> {movie.producer}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
            </div>
            <details className={styles.castDetails}>
              <summary className={styles.castSummary}>View Cast</summary>
              <p><strong>Hero:</strong> {movie.cast.heroName}</p>
              <p><strong>Heroine:</strong> {movie.cast.heroineName}</p>
              <p><strong>Villain:</strong> {movie.cast.villain}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;
