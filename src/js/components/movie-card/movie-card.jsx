import PropTypes from "prop-types"; //imports PropTypes Library
import { Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import {BookmarkStar, BookmarkStarFill } from 'react-bootstrap-icons';

import "./movie-card.scss";

export const MovieCard = ({ movieData, addFav, removeFav, isFav }) => { //destructured props argument that lets BookCard access data from MainView file - movieData has to match the props name passed in MainView
  return (
    <Card className="h-100" border="primary" >
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body className="card-body">
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieData._id)}`} className="d-grid gap-2">
          <Button variant="outline-primary">MORE INFO</Button>
        </Link>
        <div>
          {isFav ? (
            <BookmarkStarFill size={40} color="#A4C1C4" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => removeFav(movieData._id)}/>
          ) : (
            <BookmarkStar size={40} color="#A4C1C4" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => addFav(movieData._id)}/>
          )}
        </div>
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