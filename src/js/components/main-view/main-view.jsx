import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

//this exposes the MainView component so it can be brought into index.jsx
export const MainView = () => { //the function assigned here, returns the visual representation of the component
  const storedUser =JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // another state variable, sets the initial value to null
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://for-reel-d14227c07855.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView 
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token)
          }} />
          or
          <SignupView/>
      </>
    );
  }

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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};