import { Injectable } from '@angular/core';

import { Jsonp } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private api_key = '67f7161a52b498dd4aa95c5bb5c231a0';
  private UrlMovieDB = 'https://api.themoviedb.org/3';

  fecha = new Date();
  actual = [];
  limite = [];
  mesAnt = [];

  constructor( private jsonp: Jsonp) {
    this.getFechas();
   }

   getInTheatres() {
     // tslint:disable-next-line:max-line-length
      const URL = `${this.UrlMovieDB}/discover/movie?primary_release_date.gte=${this.limite[2]}-${this.limite[1]}-${this.limite[0]}&primary_release_date.lte=${this.actual[2]}-${this.actual[1]}-${this.actual[0]}&api_key=${this.api_key}&language=es-MX&region=US&callback=JSONP_CALLBACK`;
     // const URL = `${this.UrlMovieDB}/movie/now_playing?api_key=${this.api_key}&language=es-MX&page=1&region=US&callback=JSONP_CALLBACK`;

     return this.jsonp.get(URL).pipe(
       map(res => res.json())
     );
   }

   getBoxOffice() {
    // tslint:disable-next-line:max-line-length
     const URL = `${this.UrlMovieDB}/discover/movie?primary_release_date.gte=${this.actual[2] - 1}-${this.actual[1]}-${this.actual[0]}&primary_release_date.lte=${this.actual[2]}-${this.actual[1]}-${this.actual[0]}&api_key=${this.api_key}&sort_by=revenue.desc&language=es-MX&region=US&callback=JSONP_CALLBACK`;



     // tslint:disable-next-line:max-line-length
    // const URL = `${this.UrlMovieDB}/discover/movie?primary_release_date=2019&api_key=${this.api_key}&sort_by=revenue.desc&language=es-MX&callback=JSONP_CALLBACK`;
    // const URL = `${this.UrlMovieDB}/movie/now_playing?api_key=${this.api_key}&language=es-MX&page=1&region=US&callback=JSONP_CALLBACK`;


    return this.jsonp.get(URL).pipe(
      map(res => res.json())
    );
  }

  getPopulars() {
   const URL = `${this.UrlMovieDB}/discover/movie?sort_by=popularity.desc&api_key=${this.api_key}&language=es-MX&callback=JSONP_CALLBACK`;


   return this.jsonp.get(URL).pipe(
         map(res => res.json())
   );
  }

  getPopularsKids() {
    // tslint:disable-next-line:max-line-length
    const URL = `${this.UrlMovieDB}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.api_key}&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(URL).pipe(
          map(res => res.json())
    );
  }

  getMovie(id: string) {
    const URL = `${this.UrlMovieDB}/movie/${id}?api_key=${this.api_key}&language=es-MX&callback=JSONP_CALLBACK`;

    return this.jsonp.get(URL).pipe(
          map(res => res.json())
    );
  }

  getCast(id: string) {
    const URL = `${this.UrlMovieDB}/movie/${id}/credits?api_key=${this.api_key}&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(URL).pipe(
          map(res => res.json())
    );
  }

  searchMovie( texto: string ) {

    // tslint:disable-next-line:max-line-length
    const URL = `${this.UrlMovieDB}/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.api_key }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(URL).pipe(
        map( res => res.json())
    );

  }

  getFechas() {
    this.actual[0] = this.fecha.getDate();
    this.actual[1] = this.fecha.getMonth() + 1;
    this.actual[2] = this.fecha.getFullYear();

    this.mesAnt[0] = 28;
    this.mesAnt[1] = this.actual[1] - 1;
    this.mesAnt[0] = this.actual[2];

    this.limite[0] = this.actual[0] - 7;
    this.limite[1] = this.actual[1];
    this.limite[2] = this.actual[2];

    if (this.limite[0] < 1) {
      this.limite[0] = this.limite[0] + 31;
      this.limite[1] = this.limite[1] - 1;
    }

    if (this.limite[1] < 1) {
      this.limite[1] = this.limite[1] + 12;
      this.limite[2] = this.limite[2] - 1;
    }

    if (this.mesAnt[1] === 0) {
      this.mesAnt[1] = 12;
      this.mesAnt[2] = this.actual[2] - 1;
    }

    console.log(this.actual[0], this.actual[1] , this.actual[2]);
    console.log(this.limite[0], this.limite[1] , this.limite[2]);

  }

}
