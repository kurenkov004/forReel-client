import PropTypes from "prop-types"; //imports PropTypes Library
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./movie-view.scss";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies, addFav, removeFav }) => { // movies in this case is brought in from MainView
  const { movieId } = useParams(); //fetching the movieId parameter from the  URL

  const movie = movies.find((movie) => movie._id === movieId) //searching through the movies array we fetched from the API to find one movie

  return ( //remember, there can only be ONE root element in a component
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <Button onClick={addFav}>Add to favourites</Button>
      <Button onClick={removeFav}>Remove from favourites</Button>
      <Link to={`/movies`} >
        <Button variant="secondary">Back</Button>
      </Link>
    </div>
  );
};

//this defines all the prop constraints for MovieView
MovieView.propTypes = {
  expandedMovie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string,
  }).isRequired
};