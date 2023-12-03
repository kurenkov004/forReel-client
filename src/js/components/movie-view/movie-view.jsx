import PropTypes from "prop-types"; //imports PropTypes Library

export const MovieView = ({ expandedMovie, onBackClick }) => {
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
      <button onClick={onBackClick}>Back</button>
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