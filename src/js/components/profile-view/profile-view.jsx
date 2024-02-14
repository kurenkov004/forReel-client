import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';
import {Col, Row, Container, Button, Card, Form } from 'react-bootstrap';

import "./profile-view.scss";

export const ProfileView = ({ user, movies, setUser, addFav, removeFav  }) => {
  // State to store and update Profile username
  const [username, setUsername] = useState(user.Username);
  // State to store and update Profile email
  const [email, setEmail ] = useState(user.Email);
  //State to store and update Profile birthday
  const [birthday, setBirthday] = useState(user.Birthday);
   //State to store and update Profile password
   const [password, setPassword] = useState(user.Password);
  // get the authorization token

  const token = localStorage.getItem('token');

  //navigation
  const navigate = useNavigate();

  //filter out a user's favourite movies
  const favouriteMovies = movies.filter(m => user.FavouriteMovies.includes(m._id));

  // update user info
  const updateProfileInfo = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      Username: username,
      Email: email,
      Password: password,
      Birthday: birthday,
    }

    fetch(`https://for-reel-d14227c07855.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` }

    }).then(async(response) => {
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Updated user info successfully");
        console.log(updatedUser);
      } else {
        alert("Could not update user info")
      }
    })
  }

  //deleting user from database
  const deleteUserInfo = () => {
    fetch(`https://for-reel-d14227c07855.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }

    }).then ((response) => {
        if(response.ok) {
          setUser(null);
          alert("user deleted successsfully")
          localStorage.clear();
          navigate('/login'); //redirects to login page after user has been deleted
        } else {
          alert("Could not delete user")
        }  
      })
    }


    //debugging console.log below
  // console.log(user);

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4} >
          <Card>
            <Card.Body>
              <h2>My Profile</h2>
              {user ? (
                <div>
                  <p>Username: {user.Username}</p>
                  <p>Email: {user.Email}</p>
                  {/* <p>Birthday: {user.Birthday}</p> */}
                  <p>Birthday: {moment(user.Birthday).utc().format('yyyy-MM-DD')}</p>
                </div>
              ) : (
                <p>No user data available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8} >
          <Card>
            <Card.Body>
              <h2>Update Profile Info</h2>  
              <Form onSubmit={updateProfileInfo}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control 
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    // required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className='update-button'>
                  Update information
                </Button>
                <Button onClick={deleteUserInfo} variant="danger" className='delete-button' >
                  Delete User
                </Button>
              </Form>      
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
      <Row>
          <h2>Favourite Movies</h2>
          <Row>
            { favouriteMovies.length !== 0 ? 
              favouriteMovies.map((movie) => (
                <Col className="mb-5" key={movie._id} xs={12} sm={8} md={4} lg={3} >
                  <MovieCard
                    movieData={movie}
                    removeFav={removeFav}
                    addFav={addFav}
                    isFav={user.FavouriteMovies.includes(movie._id)}
                  />
                </Col>
              )) :
                <Col>
                  <p>No favourite movies yet</p>
                </Col>   
            }
          </Row>
      </Row>
    </Container>
  );
};
