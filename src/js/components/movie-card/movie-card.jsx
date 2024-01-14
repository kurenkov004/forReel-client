import PropTypes from "prop-types"; //imports PropTypes Library
import { Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movieData }) => { //destructured props argument that lets BookCard access data from MainView file
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} >
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//this defines all the prop constraints for MovieCard
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
}