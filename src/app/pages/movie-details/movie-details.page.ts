import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Results } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage {
  movieDetail?: Results;

  imageBaseUrl = environment.images;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.params['id'];
    this.movieService.getMovieDetails(id).subscribe((res) => {
      console.log(res);

      this.movieDetail = res;
    });
  }
}
