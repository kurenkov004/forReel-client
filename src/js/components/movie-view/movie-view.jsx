export const MovieView = ({ expandedMovie, onBackClick }) => {
  return ( //remember, there can only be ONE root element in a component
    <div>
      <div>
        <img src="{expandedMovie.image}" />
      </div>
      <div>
        <span>Title: </span>
        <span>{expandedMovie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{expandedMovie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{expandedMovie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{expandedMovie.director}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};