import React, { Component } from 'react'
import { movies } from './getMovies';
export default class Banner extends Component {
  render() {
    let ind=Math.floor(Math.random()*20);
      let movie=movies.results[ind];
      // console.log("works");
    return (
        <>{
            movie===''?<div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>:
        <div className="card banner-card" >
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt="..." />
            </div>
  }
    </>
        );
  }
}
