import React, { Component } from 'react';
import Movie from '../Movie/Movie';
import './Movies.css';
class Movies extends Component {
    state = {  }
    render() { 
        let moviesData = this.props.moviesData;
        return ( <div className="movies">
            {moviesData.map((movieObj) => {
                return <Movie setFavMovie={this.props.setFavMovie} favMovies={this.props.favMovies} key={movieObj.id} movie={movieObj}></Movie>
            })}
        </div> );
    }
}
 
export default Movies;