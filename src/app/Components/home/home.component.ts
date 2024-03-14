import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../Services/movies.service';
import { MovieModel } from '../../Models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements OnInit {

  moviesList: Array<MovieModel> = [];
  selectedMovieTab = 0;
  selectedMoviePage = 1;

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tabMovieChange(0);
  }

  getMovies(type: string, page: number): void {
    this.moviesService.getMovies(type, page).subscribe(res => {
      this.moviesList = res.results;
    });
  }

  tabMovieChange(index: number) {
    this.selectedMovieTab = index;
    const movieTypes = ['popular', 'upcoming', 'now_playing'];
    const selectedType = movieTypes[index];
    if (selectedType) {
      this.getMovies(selectedType, 1);
    }
  }

  trackByFun(index: number, m: MovieModel) {
    return m.id;
  }

  viewMovieContent(movieId: any) {
    this.router.navigate(['main/movie-content/', movieId]);
  }


}
