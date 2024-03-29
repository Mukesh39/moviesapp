import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'

 
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
          hover : " " ,
          parr : [1],
          currPage : 1,
          movies :[],
          favourites:[], 
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
changeMovies = async ()=>{

        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c329e49ea66541c60669781b65c43433&language=en-US&page=${this.state.currPage}`);
       let data = res.data;

       this.setState({
        movies:[...data.results]
    
    })
    
}
handleRight = () => {
    let temparr= []
    for(let i=0 ; i < this.state.parr.length+1 ;i++)
    {
        temparr.push(i);
    }
    this.setState({
        parr : [...temparr],
        currPage:this.state.currPage+1
    },this.changeMovies)

    //setState runs Asynchronisulsy there we gave changemovies as defination not call to run as call back after setState update all the processes .
}
handleLeft =()=>{
if(this.state.currPage!=1)
{
    this.setState({
        currPage:this.state.currPage-1
    } ,this.changeMovies)
}

}

handleClick =(value)=>{
    if(value!=this.state.currPage){
        this.setState({
            currPage:value},this.changeMovies)
        }
} 

 handleFavourites=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouritesState();
    }

    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }
   
//after Setting value we have to change the array of Movies as well
  render() {
    //let movie = movies.results; 
    //console.log("render");
    return(
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
                    hover:movieObj.id  , 
                })}  onMouseLeave={()=>this.setState({hover:" "})} >

                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}   alt={movieObj.title}   className="card-img-top movies-img"/>

                {/*<div className="card-body">*/}
                <h5 className="card-title  movies-title">{movieObj.original_title}</h5>
                {/* <p className="card-text movies-text" >{movieObj.overview}</p>*/}

                <div>




                
                <div className="button-wrapper" style={{display:'flex',  justifyContent:'center' ,width:'100%'}}>
                        {
                            this.state.hover == movieObj.id && <a className="btn btn-primary movies-btn"  onClick={()=> this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)? "Remove From Favourites ":"Add to Favourites"}</a> 
                        }       
                </div>
                </div>
            {/*</div>*/}
            </div>
            ) )
    }
    </div>
    <div style={{ display :'flex', justifyContent:'center'}}>
          <nav aria-label="Page navigation example">
             <ul className="pagination">
             <li className="page-item"><a className="page-link" href="#" onClick={this.handleLeft}>Previous</a></li>      
                { this.state.parr.map((value)=>(

                    <li className="page-item"><a className="page-link"  onClick={()=>this.handleClick(value)} >{value}</a></li>
    )) }
                <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
             </ul>
          </nav>
          </div>
</div>
}
</>
    )
  }
}
