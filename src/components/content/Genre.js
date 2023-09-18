import "./Genre.css";
import MovieList from "./MovieList";

export function GenreList( { genres } ) {

    return (
        <div>
            {
                genres.map((genre) => <Genre key={genre.id}
                                             id={genre.id}
                                             name={genre.name} />)
            }
        </div>
    );

}

export default function Genre( { id, name } ) {


    return (
        <div>
            <h3>{name}</h3>
            <MovieList genreId={id} />
        </div>
    );

}