import React, { Component } from 'react';
import "./Moviepage.css"
import Youtube from "react-youtube";
import axios from "axios";
import { API_KEY, API_URL } from '../../API/secret';
class Moviepage extends Component {
    
    state = { 
        movieTrailerObj: {},
     }

    componentDidMount =async() =>{
        
        //https://api.themoviedb.org/3/movie/550/videos?api_key=ec20e0159d964914e01b6cbb8f1f94de&language=en-US
        let response = await axios.get(`${API_URL}/movie/${this.props.location.state.detailedMovieObj.id}/videos?api_key=${API_KEY}`);
        let movieTrailerObj = response.data.results.filter(function(movieVideoObj){
            return (movieVideoObj.site=== "YouTube" && movieVideoObj.type === "Trailer") ? true : false;
        });
        
        
            this.setState({
                movieTrailerObj: movieTrailerObj[0], 
            })
        
        
    }
    
    
    favIconClicked = (e) =>{
        let isFav = this.props.location.state.detailedMovieObj.isFav;
        let id = this.props.location.state.detailedMovieObj.id;
        if(isFav === false){
            e.target.style.color = "red";
            this.props.location.setFavMovie(true, id);
            this.props.location.setDetailedMovieObj();
        }
        else{
            e.target.style.color = "white";
            this.props.location.setFavMovie(false, id);
            this.props.location.setDetailedMovieObj();
        }
            
        
    }
    
    render() { 
        let {title, overview, poster_path, tagline, vote_average, isFav} = this.props.location.state.detailedMovieObj;
        const opts = {
            width:"100%",
            playerVars: {
              autoplay: 1,
            },
        };


        return ( 
        <div className="movie-page">
            <div className="movie-page-poster">
                <img src={poster_path} alt="Error in displaying image!!" />
            </div>
            <div className="movie-page-details">
                <div className="favourite-movies" >
                    <i class="fas fa-heart" onClick={this.favIconClicked} style ={(isFav === true ? {color: "red"}:{color: "white"})}></i>
                    <div className="favourite-text">favourite</div>
                </div>
                <div className="movie-page-info">
                    <h1>{title}</h1>
                    <h3>{tagline}</h3>
                    <h5>IMDB: {vote_average}</h5><br></br>
                    <p>{overview}</p>
                </div>
                <div className="movie-trailer">
                    <Youtube videoId={this.state.movieTrailerObj.key} opts={opts}></Youtube>
                </div>
            </div>
        </div> );
    }
}
 
export default Moviepage;