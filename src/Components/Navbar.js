import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div>
            <h1 style={{marginTop:'1rem',marginLeft:'1rem'}}>Movies App</h1>
            <h2 style={{marginLeft:'2rem',marginTop:'1.5rem'}}>Favourites</h2>   
            </div>
        )
    }
}
