//import logo from './logo.svg';
import React from 'react';
import Navbar from './Components/Navbar.js';
import Banner from './Components/Banner.js';
import Movies from './Components/Movies.js';
import Favourite from './Components/Favourite.js';
import './App.css';

function App() {
  return (
        <>
            <Navbar/>
         { /* <Banner/>
            <Movies/>
   */}
   
   <Favourite/>
        </> )
      }
export default App;