import React, { Component } from 'react';
import FavMovie from './FavMovie/FavMovie';
import "./Favourites.css"
class Favourite extends Component {
    state = {  }

    render() { 
        let favMovies = this.props.favMovies;
       
        return ( <div className="fav-movies">
            {favMovies.map((movie) => {
                return <FavMovie key={movie.id} favMovie={movie}></FavMovie>
            })}
        </div> );
    }
}
 
export default Favourite;