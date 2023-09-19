import React, { Component } from 'react'
// import {movies} from './getMovies'
export default class Favourites extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgenre:'All Genres',
            movies:[],
            currtext:'',
            limit:5,
            currpage:1

        }
    }
    componentDidMount=()=>{
        const genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let preData=JSON.parse(localStorage.getItem("movies-app")||"[]");
        let temp=[];
        preData.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres');
        this.setState({
            genres:[...temp],
            movies:[...preData]
        })
        
       
    }
    handleChange=(genre)=>{
      this.setState({
        currgenre:genre
      })
    }
    handleSerch=()=>{
      
    }
    sortPopularityasc=()=>{
      let temp=this.state.movies;
      temp.sort((objA,objB)=>{return objB.popularity-objA.popularity})
      this.setState({
        movies:[...temp]
      })
    }
    sortPopularitydec=()=>{
      let temp=this.state.movies;
      temp.sort((objA,objB)=>{return objA.popularity-objB.popularity})
      this.setState({
        movies:[...temp]
      })
    }
    sortRatingasc=()=>{
      let temp=this.state.movies;
      temp.sort((objA,objB)=>{return objB.vote_average-objA.vote_average})
      this.setState({
        movies:[...temp]
      })
    }
    sortRatingdec=()=>{
      let temp=this.state.movies;
      temp.sort((objA,objB)=>{return objA.vote_average-objB.vote_average})
      this.setState({
        movies:[...temp]
      })
    }
    handlePageChange=(page)=>{
this.setState({
  currpage:page
})
}
handleDelete=(id)=>{
  let arr=[]
  arr=this.state.movies.filter((movieObj)=>id!==movieObj.id)
  this.setState({
    movies:[...arr]
  })
  localStorage.setItem("movies app",JSON.stringify(arr));
}

    render() {
        //   const movie=movies.results;
        const genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
 let filtearray=[];
 
 if(this.state.currtext==''){
   filtearray=this.state.movies
 }
 else {
   filtearray=this.state.movies.filter((movieObj)=>{
     let title=movieObj.original_title;
     return title.includes(this.state.currtext.toLowerCase())
   })
 }

  if(this.state.currgenre!=="All Genres"){

   filtearray=this.state.movies.filter((movieObj)=>this.state.currgenre===genreids[movieObj.genre_ids[0]]);
 }
 let pages=Math.ceil(filtearray.length/this.state.limit)
 let pagearr=[]
 for(let i=1;i<=pages;++i){pagearr.push(i)}
 let si=(this.state.currpage-1)*this.state.limit
 let ei=si+this.state.limit
 filtearray=filtearray.slice(si,ei);

// console.log("filterarray",filtearray);
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <ul className="list-group favourite-list">
                 {
                 this.state.genres.map((genre)=>(
                     this.state.currgenre==genre?                   
                     <li key={genre.toString()} className="list-group-item" style={{background:'#5b65f0',color:"#ffffff"}}>{genre}</li>:
                     <li className="list-group-item" style={{background:"white",color:"#5b65f0"}} onClick={()=>this.handleChange(genre)}>{genre}</li>
                     ))
                    }
                    {/* <li class="list-group-item">{genre}</li> */}
               
              </ul>
            </div>
            <div className="col-lg-9 col-sm-12 favourite-col2">
                <div className='row'>
                <input type={"text"} className="input-group-text col " placeholder='Search with text...' value={this.state.currtext} onChange={(e)=>this.setState({currtext:e.target.value})}></input>
                <input type={"number"} className="input-group-text col" placeholder='Row count...' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
                </div>
                                
              <div className='row'>
              <table className="table">                                    
                <thead>
                    <tr>
                        <th scope='col'></th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i class="fa-solid fa-caret-down" onClick={this.sortPopularityasc}></i>Popularity<i class="fa-solid fa-caret-up" onClick={this.sortPopularitydec}></i></th>
                    <th scope="col"><i class="fa-solid fa-caret-down" onClick={this.sortRatingasc}></i>Rating<i class="fa-solid fa-caret-up" onClick={this.sortRatingdec}></i></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtearray.map((movieObj)=>(
                                <tr>
                                <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:"4vw",height:"4vw"}} className="img-thumbnail"></img></td>
                                <td>{movieObj.original_title}</td>
                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                <td>{movieObj.popularity}</td>
                                <td>{movieObj.vote_average}</td>
                                <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                </tr>

                        ))
                    }
                
                </tbody>
                </table>
                </div>
            </div>
          </div>
          <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    {/* <li className="page-item"><a className="page-link" href="#">Previous</a></li> */}
  {
    pagearr.map((page)=>(

      <li className="page-item"><a className="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
    ))
  }
  </ul>
</nav>
        </div>
      </>
    )
  }
}
