import React, { Component } from 'react' ; 
import { movies } from './getMovies';

export default class Favourite extends Component {
    constructor(){
        super();
        this.state = {
            genre  : [],
            currgen : "All Genre"
        }
    }
  render()
   {


    const movie = movies.results;
    console.log(movie); 
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    let temp = [] ;
        movie.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
            temp.push(genreids[movieObj.genre_ids[0]])
    }
} )
temp.unshift("All Genre");
console.log(temp);


// //Take care This 
// this.setState({
//     genres : [...temp]
// })


    return (
      <div>
            <>      
      <div className="main">
        <div className="row">
                <div className="col-3">
                <ul className="list-group  favourites-genres">
    { /*side Bar*/}
                {

                  temp.map((genre)=>(
                    this.state.currgen==genre ? 

                    <li className="list-group-item"  style={{ background:'blue', color:'white', fontWeight:'bold' }}>{genre} </li> 
                    
                    :

                    <li className="list-group-item"  style={{ background:'white', color:'blue', fontWeight:'bold' }}>{genre} </li>

                  ))
                }
                 </ul>
                </div>
                <div className="col-9 faovourites-table">
                        <div className="row"  style={{marginRight:'1rem' ,width:'66rem'}}>
                            <input type="text " className="input-group-text col" placeholder='search' />
                            <input type="number" className="input-group-text col " placeholder='rows-count'/>
                        </div>

                <div className="row">
                
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Popularity</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Erase</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                             movie.map((movieObj)=>(
                                <tr>
                                <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'5rem'}} alt={movieObj.title} /></td>
                                <td>{movieObj.original_title}</td>
                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                <td>{movieObj.popularity}</td>
                                <td>{movieObj.vote_average}</td>
                                <td><button type="button" class="btn btn-danger">Danger</button></td>
                                </tr>
                             ))
                        }
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
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
