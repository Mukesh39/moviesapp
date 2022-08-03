import React, { Component } from 'react';
// import { movies } from './getMovies';
import axios from 'axios';
import '../App.css'

 
export default class Movies extends Component {

    constructor() {
        super();
        this.state = {
          hover : " " ,
          parr : [1],
          currPage : 1,
          movies :[ ]
        }
    }
   
   async componentDidMount(){  
     const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c329e49ea66541c60669781b65c43433&language=en-US&page=${this.state.currPage}`);
       let data = res.data;

       this.setState({
        movies:[...data.results]
       })
        console.log(data);
        console.log("mounting done");
    }

  render() {
    // let movie = movies.results; 
    console.log("render");
    return (
<>
{
    this.state.movies.length==0?
    <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
    </div>
    :
    <div>
    <h3  className='text-center'>Trending</h3>
    <div className='movies-list'>
    {
            this.state.movies.map((movieObj)=> (

                <div className="card  movies-card"  onMouseEnter={()=>this.setState({
                    hover:movieObj.id 
                })}  onMouseLeave={()=>this.setState({hover:" "})} >

                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}   alt={movieObj.title}   className="card-img-top movies-img"/>

                {/*<div className="card-body">*/}
                <h5 className="card-title  movies-title">{movieObj.original_title}</h5>
                {/* <p className="card-text movies-text" >{movieObj.overview}</p>*/}

                <div>
                <div className="button-wrapper" style={{display:'flex',  justifyContent:'center' ,width:'100%'}}>
                        {
                            this.state.hover == movieObj.id &&  <a href= "http://localhost:3003/#" className="btn btn-primary movies-btn">Add to Favourites</a>  
                        }
                </div>
                </div>
            {/*</div>*/}
            </div>
            ))
    }
    </div>
    <div style={{ display :'flex', justifyContent:'center'}}>
          <nav aria-label="Page navigation example">
             <ul className="pagination">
             <li className="page-item"><a className="page-link" href="#">Previous</a></li>      
                { this.state.parr.map((value)=>(
                    <li className="page-item"><a className="page-link" href="#">{value}</a></li>
    )) }
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
             </ul>
          </nav>
          </div>
</div>
}
</>
    )
  }
}