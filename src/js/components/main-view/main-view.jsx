import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//this exposes the MainView component so it can be brought into index.jsx
export const MainView = () => { //the function assigned here, returns the visual representation of the component
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null); // another state variable, sets the initial value to null

  useEffect(() => {
    fetch("https://for-reel-d14227c07855.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            image: doc.image,
            director: doc.director_name?.[0],
            genre: doc.genre_name?.[0],
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) { 
    return (
      <MovieView
        expandedMovie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)} //prop that returns movie state to "null," allowing the "back" button to return user to MainView
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard //only displays a movie's title
          key={movie.id} //value of key must be unique, helps distinguish between similar elements in the list
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};