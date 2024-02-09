import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";
import React from "react";

//this exposes the MainView component so it can be brought into index.jsx
export const MainView = () => {
  //the function assigned here, returns the visual representation of the component
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]); // movies is assigned the current state, setMovies is the method that updates the movies variable
  const [selectedMovie, setSelectedMovie] = useState(null); // another state variable, sets the initial value to null
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  
 
  
  //fetch all movies from Heroku API
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://for-reel-d14227c07855.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, [token]);

  console.log(movies);

  //add movie to Favourites
  const addFav = (id) => {

    fetch(`https://for-reel-d14227c07855.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Could not add to favourites");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  //remove movie from Favourites
  const removeFav = (id) => {
    fetch(`https://for-reel-d14227c07855.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Could not remove from favourites");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  }


  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView
                      movies={movies}
                      addFav={addFav}
                      removeFav={removeFav}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard
                          movieData={movie}
                          addFav={addFav}
                          removeFav={removeFav}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies here</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard 
                          movieData={movie}
                          addFav={addFav}
                          removeFav={removeFav}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                      <Col>
                        <ProfileView
                          user={user}
                          movies={movies}
                          setUser={setUser}
                          addFav={addFav}
                          removeFav={removeFav} />
                      </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};