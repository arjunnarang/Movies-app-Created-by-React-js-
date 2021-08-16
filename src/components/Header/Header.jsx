import React, { Component } from 'react';
import './Header.css';
import {Link} from "react-router-dom";
class Header extends Component {
    state = { 
        newMovieName:"",
     }
    
     handleKeyPress = (e)=>{
        if(e.key === "Enter"){
            this.props.setNewMovie(this.state.newMovieName);
        }
     }
     
     handleOnChange = (e)=>{
         let newMovieName = e.target.value;
         this.setState({
             newMovieName: newMovieName,
         })
     }
    render() { 
        
        return ( 
        <div className="header">
            <div className="logo">
                <img src="netflix.svg" alt="" />
            </div>
            <div className="search-input">
                <input type="text" value={this.state.newMovieName} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} placeholder="Search"/>
            </div>
            <div className="header-links">
                <div className="header-link">
                    <Link to="/">Home</Link>
                </div>
                <div className="header-link">
                    <Link to="/favourites" >Favourites</Link>
                </div>
            </div>
        </div> );
    }
}
 
export default Header;