import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import './main-view.scss'

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

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token)}} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
          expandedMovie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty</div>
      ) : (
        <>
        {movies.map((movie) => (
          <Col className="mb-5" key={movie.id} md={3}>
            <MovieCard
              movieData={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
          ))}
          <Button variant="primary" type="logout" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
        </>
      )}
      
    </Row>
  );
};