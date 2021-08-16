import React, { Component } from 'react';
import FavMovie from './FavMovie/FavMovie';
import "./Favourites.css"
class Favourite extends Component {
    state = {  }

    render() { 
        let favMovies = this.props.favMovies;
        let setFavMovie = this.props.setFavMovie;
        return ( <div className="fav-movies">
            {favMovies.map((movie) => {
                return <FavMovie key={movie.id} favMovie={movie} setFavMovie={setFavMovie}></FavMovie>
            })}
        </div> );
    }
}
 
export default Favourite;