import React, { Component } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../../API/secret';
import {Link} from "react-router-dom";
import "./FavMovie.css"
class FavMovie extends Component {
    state = { 
        detailedMovieObject: {},
     }
    render() { 
        let favMovie = this.props.favMovie;
        let {poster_path, title, vote_average} = this.props.favMovie;
        let posterPath = IMAGE_URL+ poster_path;
        return (  <div className="movie">
                        <div className="movie-poster">
                            {/* <Link to={ {pathname: '/moviepage'}}> */}
                                <img src={posterPath} alt=""  />
                            {/* </Link> */}
                            
                        </div>
                        <div className="movie-info">
                            <div className="movie-title">{title}</div>
                            <div className="movie-rating">{vote_average} IMDB</div>
                        </div>
            </div>
     );
    }
}
 
export default FavMovie;