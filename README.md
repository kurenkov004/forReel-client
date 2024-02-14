# ForReel application
## App description
This is a single-page, responsive app  which supports an existing server-side REST API and a MongoAtlas-hosted database. Both this app and the connected API were built as part of an exercise for the CareerFoundry Full Stack Development course, aimed to familiarize the student with the MERN tech stack. 

The interface allows movie enthusiasts to create an account and browse through a collection of movies, finding out more information about each picture, as well as saving any particular favourites to their profile. 

## Key Dependencies
- bootstrap
- bootstrap-icons
- moments
- proptypes
- react
- react-bootstrap
- react-bootstrap-icons
- react-dom
- react-router
- react-router-dom
- parcel
- parcel/transformer-sass: (^2.10.2)

## Link to API
 movie_api (https://for-reel-d14227c07855.herokuapp.com)

## Link to ForReel App
For Reel (for-reel.netlify.app)
## Key Components
### Login View
- Allows users to log in with a username and password
### Signup View
- Allows new users to register and gain access to database
### Main View
- Main page, returns all movies which can be filtered by ovie title
- Allows user to select a single movie to see more information about it
- Allows user to log out
- Allows user to navigate to a Profile View
### Movie View
- Shows a single movie that has been selected by user, basically a more detailed view containing full information about a particular movie
### Profile View
- Displays user details
- Allows user to update their information as well as delete their account
- Displays a user's favourite movies
- A user is able to add or remove movies from their favourites list