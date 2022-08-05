//import logo from './logo.svg';
import React from 'react';
import Navbar from './Components/Navbar.js';
import Banner from './Components/Banner.js';
import Movies from './Components/Movies.js';
import Favourite from './Components/Favourite.js';
import { BrowserRouter as Router ,Routes , Route , BrowserRouter} from 'react-router-dom';
import './App.css';
//import { movies } from './Components/getMovies.js';

//movies comes from the Sample data of getMovies 

function App() {
  return (
 
        <Router>
          <Navbar/>
          <Routes>
          <Route  exact path='/'  element={<Movies/>} render={(props)=>(
            //this is inbuild props in React route and it is used like this 
            //Now you can use props by passing properties as well 
            //see Below we didin previsou projects 
             <>
            <Banner {...props}/>
            <Movies {...props}/>
            </>
          )}/>

          <Route path='/favourites' element={<Favourite/>}/>
          </Routes>

       {/*  {/*  <Banner/>     */}
         {/*  <Movies/>     */}
         {/*  <Favourite/>  */}
        
         </Router>
        );
      }
export default App;
