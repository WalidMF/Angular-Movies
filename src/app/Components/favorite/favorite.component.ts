import { Component, OnInit } from '@angular/core';
import { MovieContentModel } from '../../Models/movie-content.model';
import { MoviesService } from '../../Services/movies.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../Environments/environment';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {

  baseUrl: string;
  apiKey: string;
  movieId: any;
  movieContent?: MovieContentModel;
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
    this.isFavoriteMovie(this.movieId);

  }

  isFavoriteMovie(id:any){
    this.movieId = localStorage.getItem('Favorite-Movie');
    if(this.movieId ){
      this.isFavorite = true;
      this.getMovieContent(this.movieId);
    }
    else{
      this.isFavorite = false;
    }
  }

  getMovieContent(id: any) {
    this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}`).subscribe(res => {
      this.movieContent = res;
    });
  }

  viewMovieContent(movieId: any) {
    this.router.navigate(['main/movie-content/', movieId]);
  }

  deleteToFavorite(id:any){
    localStorage.removeItem('Favorite-Movie');
    window.location.reload();
  }


}
