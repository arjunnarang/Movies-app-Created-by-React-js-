import React, { Component } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../../API/secret';
import {Link} from "react-router-dom";
import "./FavMovie.css"
import axios from "axios"
class FavMovie extends Component {
    state = { 
        detailedMovieObj: {},
     }

    componentDidMount = async () =>{
        
        // https://api.themoviedb.org/3/movie/550?api_key=ec20e0159d964914e01b6cbb8f1f94de
        let response = await axios.get(`${API_URL}/movie/${this.props.favMovie.id}?api_key=${API_KEY}`);
        let detailedMovieObj = response.data;
        let poster_path = IMAGE_URL+detailedMovieObj.poster_path;
        let isFav = this.props.favMovie.isFav;
        
        
            this.setState({
                detailedMovieObj: {...detailedMovieObj, poster_path, isFav},
            })
        
        
    }

    setDetailedMovieObj =() => {
        let detailedMovieObj = this.state.detailedMovieObj;
        detailedMovieObj.isFav = !detailedMovieObj.isFav;

        this.setState({
            detailedMovieObj: detailedMovieObj,
        })
    }
    render() { 
        let favMovie = this.props.favMovie;
        let {poster_path, title, vote_average} = this.props.favMovie;
        let posterPath = IMAGE_URL+ poster_path;
        let setFavMovie = this.props.setFavMovie;
        return (  <div className="movie">
                        <div className="movie-poster">
                            <Link to={ {pathname: '/moviepage', state: { detailedMovieObj: this.state.detailedMovieObj, }, favMovies:this.props.favMovies, setFavMovie: setFavMovie, setDetailedMovieObj: this.setDetailedMovieObj}}>
                                <img src={posterPath} alt=""  />
                            </Link>
                            
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