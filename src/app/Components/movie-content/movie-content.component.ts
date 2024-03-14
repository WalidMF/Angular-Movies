import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../Services/movies.service';
import { MovieModel } from '../../Models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../Environments/environment';
import { MovieContentModel } from '../../Models/movie-content.model';


@Component({
  selector: 'app-movie-content',
  templateUrl: './movie-content.component.html',
  styleUrl: './movie-content.component.css'
})
export class MovieContentComponent implements OnInit {

  baseUrl: string;
  apiKey: string;
  movieId: any;
  movieContent?: MovieContentModel;
  moviegeners?: any;
  trailerList: any;
  video: any;
  moviesList: Array<MovieModel> = [];
  p: number = 1;

  isFavorite=false;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = environment.theMovieDBApi;
  }

  ngOnInit() {
    this.movieId = String(this.route.snapshot.paramMap.get('id'));
    this.getMovieContent(this.movieId);
    this.getMovieVideo(this.movieId);
    this.getRecomendMovies(this.movieId);

  }

  getMovieContent(id: any) {
    this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}`).subscribe(res => {
      this.movieContent = res;
      this.moviegeners = this.movieContent.genres;
      this.isFavoriteMovie(this.movieContent?.id)
    });
  }

  getMovieVideo(id: any) {
    this.moviesService.getMovieVideos(id).subscribe(res => {
      if (res?.results?.length > 0) {
        this.trailerList = res.results.filter((v: { type: string; }) => v.type === 'Trailer');
        this.video = 'https://www.youtube.com/embed/' + this.trailerList[0].key;
      } else {
        this.video = null;
      }
    }, () => { });
  }

  getRecomendMovies(id: any): void {
    this.moviesService.getRecomendMovies(id).subscribe(res => {
      this.moviesList = res.results;
    });
  }

  isFavoriteMovie(id:any){
    const mid = localStorage.getItem('Favorite-Movie');
    if(mid == this.movieContent?.id){
      this.isFavorite = true;
    }
  }

  addToFavorite(id:any){
    localStorage.setItem('Favorite-Movie', id);
    window.location.reload();
  }

  goToFavoritePage(){
    this.router.navigate(['main/favorite/']);
  }
}
