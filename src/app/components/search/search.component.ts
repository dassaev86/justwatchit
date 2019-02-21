import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  resultados = [];
  buscar = '';
  busqueda = false;




  constructor(private moviesService: MoviesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

                this.activatedRoute.params.subscribe( params => {
                  if (params['word']) {
                    this.buscar = params['word'];
                    this.search();
                  }

                });
               }

  ngOnInit() {
  }

  search() {
    this.moviesService.searchMovie(this.buscar).subscribe( data => {
      console.log(data.results);
      this.resultados = data.results;
      this.busqueda =  true;
      return;
    });
  }

  masInfo(id) {
    this.router.navigate(['/info', id, 'search', this.buscar]);
  }

}
