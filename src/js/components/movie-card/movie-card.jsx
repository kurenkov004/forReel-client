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