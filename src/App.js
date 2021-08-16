import React, { Component } from 'react';
import Header from './components/Header/Header';
import Movies from './components/Movies/Movies';
import axios from 'axios';
import Pagination from './components/Pagination/Pagination';
import { API_KEY, API_URL } from './API/secret';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Favourite from './components/Favourites/Favourites';
import Moviepage from './components/Moviepage/Moviepage';
class App extends Component {
	
	state = { 
		moviesData:[],
		currentMovie: 'avengers',
		pages:[],
		currPage: 1,
		favMovies:[],
	 }

	async componentDidMount() {
		
		let data = await axios.get(API_URL + '/search/movie', {params: {api_key: API_KEY, page:1, query: this.state.currentMovie}});
		let totalPages = data.data.total_pages;
		let pages = [];
		for(let i = 1; i<=totalPages; i++){
			pages.push(i);
		}
		
		let newData = data.data.results.map((movieObj) => {
			let newMovieObj = {...movieObj, isFav:false};
			return newMovieObj;
		});

		
			this.setState({
				moviesData: newData,
				pages:pages,
			})
		
		
	}

	setNewMovie = async (newMovieName) => {
		let data = await axios.get(API_URL + '/search/movie', {params: {api_key: API_KEY, page:1, query: newMovieName}});
		let totalPages = data.data.total_pages;
		let pages = [];
		for(let i = 1; i<=totalPages; i++){
			pages.push(i);
		}
		this.setState({
			moviesData: data.data.results,
			currentMovie: newMovieName,
			pages:pages,
		})

	}

	nextPage =async() => {
		let data = await axios.get(API_URL + '/search/movie', {params: {api_key: API_KEY, page:this.state.currPage+1, query: this.state.currentMovie}});
		this.setState({
			moviesData: data.data.results,
			currPage: this.state.currPage+1,
		})

	}

	prevPage = async() => {
		let data = await axios.get(API_URL + '/search/movie', {params: {api_key: API_KEY, page:this.state.currPage-1, query: this.state.currentMovie}});
		this.setState({
			moviesData: data.data.results,
			currPage: this.state.currPage-1,
		})
	}

	setPage = async(pageCount) => {
		let data = await axios.get(API_URL + '/search/movie', {params: {api_key: API_KEY, page:pageCount, query: this.state.currentMovie}});
		this.setState({
			moviesData: data.data.results,
			currPage: pageCount,
		})
	}

	setFavMovie = (isFav, id) => {
		let favMovie = this.state.moviesData.filter((movieObj) => {
			return (movieObj.id === id)?true: false;
		})
		let favMovieObj = favMovie[0];
		favMovieObj.isFav = isFav;
		
		let favMovies = [];
		if(isFav == true){  
			favMovies = [...this.state.favMovies, favMovieObj];
		}
		else{
			favMovies = this.state.favMovies.filter((movieObj) => {
				
				return (movieObj.id === id)?false: true;
			});

		}
		
		this.setState({
			favMovies: favMovies,
		})
	}

	
	render() { 
		return ( <Router>
			<div className="App">
				<Header setNewMovie={this.setNewMovie}></Header>
				<Switch>
					<Route path="/" exact>
						<Movies setFavMovie={this.setFavMovie} moviesData={this.state.moviesData} favMovies={this.state.favMovies}></Movies>
						<Pagination pages={this.state.pages} currPage={this.state.currPage} nextPage={this.nextPage} prevPage={this.prevPage} setPage={this.setPage}></Pagination>
					</Route>
					<Route path="/favourites" exact>
						<Favourite favMovies={this.state.favMovies}></Favourite>
					</Route>
					<Route path="/moviepage" exact component={Moviepage}>
						
					</Route>
				</Switch>
				
			</div>
		</Router>
		 );

	}
}
 
export default App;
