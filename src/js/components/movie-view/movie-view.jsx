import PropTypes from "prop-types"; //imports PropTypes Library
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";

export const MovieView = ({ expandedMovie }) => {
  const { movieId } = useParams();

  const movie = expandedMovie.find((b) => b.id === movieId)

  return ( //remember, there can only be ONE root element in a component
    <div>
      <div>
        <img src={expandedMovie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{expandedMovie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{expandedMovie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{expandedMovie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{expandedMovie.Director.Name}</span>
      </div>
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