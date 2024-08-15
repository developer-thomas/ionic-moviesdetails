import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService, Results } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  // Cada página mostra 20 elementos, cada adição de página, carrega +20 elementos
  currentPage = 1;
  movies: Results[] = [];
  imageBaseUrl = environment.images;

  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // passar o parâmetro do evento opcional, pois nem toda chamada desse método utiliza o ev.
  async loadMovies(eventLoadMore?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      // utiliza-se o spread para criar um array desses resultados
      this.movies.push(...res.results);

      // finalizando a animação do evento de carregar mais
      eventLoadMore?.target.complete();

      // se houver a chamada do evento de carregar mais
      // iremos atribuir disabled quando o total de páginas for igual a página atual
      if (eventLoadMore) {
        eventLoadMore.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
