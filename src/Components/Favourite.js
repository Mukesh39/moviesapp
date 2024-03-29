import React, { Component } from 'react' ; 
import { movies } from './getMovies';
import '../App.css';

export default class Favourite extends Component {
    constructor(){
        super();
        this.state = {
            genres:[],
            currgen : "All Genre",
            movies:[],
            currText:'',
            limit : 5,
            currPage : 1,
        }
    }

    componentDidMount(){

        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

     let data = JSON.parse(localStorage.getItem("movies-app") || "[]") 
     let temp = [] ; 
     data.forEach((movieObj)=>
     
     {
        if(!temp.includes(genreids[movieObj.genre_ids[0]]))
        {
        temp.push(genreids[movieObj.genre_ids[0]]) 
        }
    } )
     temp.unshift("All Genre");
     this.setState({
        genres:[...temp],
        movies:[...data]
     })
    }
handleGenreChange=(genre)=>
    {
     this.setState({
        currgen:genre 
     })
    }

//sorting popularity wise Here only no state Change 
//with Descending order 
//See mdn with Sorting techniques in MDN documnets you can type in google 
sortPopularityDesc=()=>{
    let temp = this.state.movies ;
    temp.sort(function(objA,objB) {
        return objB.popularity-objA.popularity ;
    })

    this.setState({
        movies :[...temp]
    })
}


//

sortPopularityAsc=()=>{
    let temp = this.state.movies ;
    temp.sort(function(objA,objB) {
        return objA.popularity-objB.popularity ;
    })

    this.setState({
        movies :[...temp]
    })
}


//

sortRatingDesc=()=>{
    let temp = this.state.movies ;
    temp.sort(function(objA,objB) {
        return objB.vote_average-objA.vote_average ;
    })

    this.setState({
        movies :[...temp]
    })
}


//

sortRatingAsc=()=>{
    let temp = this.state.movies ;
    temp.sort(function(objA,objB) {
        return objA.vote_average-objB.vote_average ;
    })

    this.setState({
        movies :[...temp]
    })
}
handlePageChange = (page)=>{

this.setState({
    currPage:page 
})
}
handleDelete = (id)=>
{
    let newarr = [];
    newarr = this.state.movies.filter((movieObj) => movieObj.id!=id)
  this.setState({
    movies : [...newarr]
  })

  localStorage.setItem("movies-app" , JSON.stringify(newarr)) ;

}
  render()
   {

    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        //filter the Cliked One 
 let filterarr = [];
 if(this.state.currText===" ")
 {
    filterarr = this.state.movies
 } 
 else{
    filterarr =this.state.movies.filter((movieObj)=>{ 
   let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase())
      })

 }

// {
//     filterarr = this.state.movies 
// }
if(this.state.currgen!="All Genre")
{
    filterarr = this.state.movies.filter((movieObj)=> genreids[movieObj.genre_ids[0]]==this.state.currgen)
}
//console.log(genreids[movieObj.genre_ids[0]]);

//seeting the limit on page in current page

let pages = Math.ceil(filterarr.length /this.state.limit) ;

//check
console.log(pages);

let pagesarr = [] ;
for( let i = 1 ; i<=pages ; i++)
{
    pagesarr.push(i) 
}
//check
console.log(pagesarr);

let si = (this.state.currPage - 1) * this.state.limit ;
let ei = si+this.state.limit;


//Arrar = Array.sliceoperation to cut down the size directly 
filterarr = filterarr.slice(si,ei);



    return (
      <div>
            <>      
      <div className="main">
        <div className="row">
                <div className="col-lg-3 col-sm-12">
                <ul className="list-group  favourites-genres">
                {
                  this.state.genres.map((genre)=>(
                    this.state.currgen == genre? 

                    <li className="list-group-item"  style={{background:"#3f51b5",color:'white',fontWeight:"bold" , cursor:"pointer"}} > {genre}</li>   
                    :
                    <li className="list-group-item"  style = {{ background:'white', color:'#3f51b5',cursor:"pointer", fontWeight:'bold'}}  onClick={()=>this.handleGenreChange(genre)}> {genre} </li>
                  ) ,)
                }

                 </ul>
                 
                </div>
                <div className="col-lg-9 favourites-table  col-sm-12">
                        <div className="row">
                            <input type="text " className="input-group-text col " placeholder='search'  value ={this.state.currText}  onChange={(e)=>this.setState({currText:e.target.value})}/>
                            <input type="number" className="input-group-text col " value={this.state.limit} onChange={(e)=> this.setState({
                                limit:e.target.value
                            })} placeholder='rows-count'/>
                            
                        </div>
                <div className="row">
                
                    <table className="table">
                        <thead>
                            <tr>
                            <th></th>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                          {/*  // no state Change Only sorting Things up and Down  */}
                            <th scope="col" ><i class="fa-solid fa-sort-up"  onClick={this.sortPopularityDesc}></i> Popularity <i class="fa-solid fa-sort-down"  onClick={this.sortPopularityAsc}></i></th>
                            <th scope="col"> <i class="fa-solid fa-sort-up"  onClick={this.sortRatingDesc}></i> Rating <i class="fa-solid fa-sort-down"  onClick={this.sortRatingAsc}></i></th>
                            <th scope="col">Erase</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                             filterarr.map((movieObj)=>(
                                <tr>
                                <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'5rem'}} alt={movieObj.title} /></td>
                                <td>{movieObj.original_title}</td>
                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                <td>{movieObj.popularity}</td>
                                <td>{movieObj.vote_average}</td>
                                <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                </tr>
                             ))
                        }
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                        {
                            pagesarr.map((page) => (
                                <li className="page-item"><a className="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a>
                                </li>
                        ))
                        }     
                        </ul>
                    </nav>
                </div>
             </div>
      </div>
      </div>
            </>
    </div>
    )
  }
}
