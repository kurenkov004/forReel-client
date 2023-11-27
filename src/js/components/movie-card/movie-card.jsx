import PropTypes from "prop-types"; //imports PropTypes Library

export const MovieCard = ({ movieData, onMovieClick }) => { //destructured props argument that lets BookCard access data from MainView file
  return (
    <div
      onClick={() => {
        onMovieClick(movieData)
      }}
    >
      {movieData.title}
    </div>
  );
};

//this defines all the prop constraints for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}