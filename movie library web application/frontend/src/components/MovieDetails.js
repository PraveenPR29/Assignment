import React from 'react';

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <h2>{movie.Title}</h2>
      <div>
        <img src={movie.Poster} alt={movie.Title} />
        <div>
          <p>Year: {movie.Year}</p>
          <p>Type: {movie.Type}</p>
          <p>IMDB ID: {movie.imdbID}</p>
        </div>
      </div>
      <p>Plot: {movie.Plot}</p>
      <p>Actors: {movie.Actors}</p>
      <p>Director: {movie.Director}</p>
      <p>Genre: {movie.Genre}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetails;
