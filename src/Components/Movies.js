import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios'
export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: '',
      parr: [1],
      currPage: 1,
      movies:[],
      favourites:[]
     
    }
  }
async componentDidMount(){
  const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4421b18a6a9388ed347a64f75115ed45&language=en-US&page=1`);
  let data=res.data;
  // console.log(data);
  // console.log("mounting done");
  this.setState({
    movies:[...data.results]
  })
}
changeMovies=async ()=>{
  if(this.currPage!==1){
  const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4421b18a6a9388ed347a64f75115ed45&language=en-US&page=${this.state.currPage}`);
  let data=res.data;
  // console.log("change movies called");
  this.setState({
    movies:[...data.results]
   
    })
  }
}
handleRight=()=>{
  // console.log("handle right called");
  let temp=[];
  for(let i=1;i<=this.state.currPage+1;++i){
    temp.push(i);
  }
  this.setState({
    parr:[...temp],
    currPage:this.state.currPage+1
  })
  this.changeMovies();
  //because setstate is asynchronus function

}
handleLeft=()=>{
this.currPage!==1?this.setState({currPage:this.state.currPage-1}):this.state.currPage=this.state.currPage
}
handleClick=(e)=>{
this.setState({
  currPage:e
})
this.changeMovies();
}
handleFavourites=(movieObj)=>{
  let preData= JSON.parse(localStorage.getItem('movies-app')||"[]");
  // let arr;
  if(this.state.favourites.includes(movieObj.id)){
    
 let arr=preData.filter((m)=>(m.id!==movieObj.id))
   preData=arr;
    }
  else{
    preData.push(movieObj);
  }
  localStorage.setItem("movies-app",JSON.stringify(preData));
  let updated_id_array=preData.map((movie)=>movie.id);

  // console.log(preData);
  this.handleFavouritesStates();
}
handleFavouritesStates=()=>{
 let preData=JSON.parse(localStorage.getItem("movies-app")||"[]");
let temp=preData.map((movieObj)=>movieObj.id);
this.setState({
  favourites:[...temp]
})
}
  render() {
    // console.log("rendering done");
    return (
      <>
        {this.state.movies.legth == 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center ">
              <strong>Trending movies...</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: '' })}
                >
                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}alt={movies.title} className=" img-thumbnail card-img-top movies-img"></img>
                <h5 className='card-title movies-title'>{movieObj.original_title} </h5>
                <div className='button-wrapper' style={{display:"flex",width:"100%",WebkitJustifyContent:'center'}}>
                {
                      this.state.hover==movieObj.id &&<a className='btn btn-primary movies-button' onClick={()=>this.handleFavourites(movieObj)}>
                   {
                      this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to favourites"
                     }
                   </a>
                }
                </div>
                </div>
                
              ))}
            </div>
            {/* <div className="infinite-loader"style={{display:'flex',justifyContent:'center'}}>
                            <h2>Load More Movies .........................</h2>
                        </div> */}
                        
                        <ul className="pagination justify-content-center ">
                                <li className="page-item  "><a className="page-link " onClick={this.handleLeft}>Previous</a></li>
                                {
                                    this.state.parr.map((value,index)=>(
                                        <li className="page-item " key={value.toString()}><a className="page-link " onClick={()=>this.handleClick(value)}>{value}</a></li>
                                    ))
                                }
                                <li className="page-item "><a className="page-link " onClick={this.handleRight}>Next</a></li>
                            </ul>
                         
          </div>
          
        )}
      </>
    )
  }
}
