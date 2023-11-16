import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//this exposes the MainView component so it can be brought into index.jsx
export const MainView = () => { //the function assigned here, returns the visual representation of the component
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Silence of the Lambs",
      image:
        "https://www.imdb.com/title/tt0102926/mediaviewer/rm3242988544/?ref_=tt_ov_i",
      description:
        "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      genre: "Thriller",
      director: "Jonathan Demme"
    },
    {
      id: 2,
      title: "The Lord of the Rings: Return of the King",
      image:
        "https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i",
      description:
        "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
      genre: "Fantasy",
      director: "Peter Jackson"
    },
    {
      id: 3,
      title: "Gladiator",
      image:
        "https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592/?ref_=tt_ov_i",
      description:
        "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      genre: "Drama",
      director: "Ridley Scott"
    },
    {
      id: 4,
      title: "The Shawshank Redemption",
      image:
        "https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592/?ref_=tt_ov_i",
      description:
        "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      genre: "Drama",
      director: "Frank Darabont"
    },
    {
      id: 5,
      title: "The Prestige",
      image:
        "https://www.imdb.com/title/tt0482571/mediaviewer/rm4031813632/?ref_=tt_ov_i",
      description:
        "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
      genre: "Drama",
      director: "Christopher Nolan"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null); // another state variable, sets the initial value to null

  if (selectedMovie) { 
    return (
      <MovieView
        expandedMovie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)} //prop that returns movie state to "null," allowing the "back" button to return user to MainView
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard //only displays a movie's title
          key={movie.id} //value of key must be unique, helps distinguish between similar elements in the list
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};