import PropTypes from "prop-types"; //imports PropTypes Library
import { Button, Card} from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movieData, onMovieClick }) => { //destructured props argument that lets BookCard access data from MainView file
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClick(movieData)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

//this defines all the prop constraints for MovieCard
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}