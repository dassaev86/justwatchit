import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Jsonp } from '@angular/http';
import { Router } from '@angular/router';
import { OpinionesService } from '../../services/opiniones.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Pelicula } from '../../models/peliculas.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  populars: any[] = [{
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  }];
  boxOffice: any[] = [];
  cines: any[] = [{
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  },
  {
    release_date: '',
    backdrop_path: '',
    original_title: '',
    overview: ''
  }];
  mejoresValoradas: Pelicula[] = [];
  fecha = new Date();
  actual = [];
  limite = [];
  logueado = false;
  emailUsuario: string;
  usuarioActual: Usuario = {
    uid: '',
    email: '',
    nombre: '',
    edad: '',
    genero: '',
    valorados: []
};

  constructor(public moviesService: MoviesService,
              public _opinionesService: OpinionesService,
              public authService: AuthService,
              private router: Router) {

    this.showPopulars();
    this.showBoxOffice();
    this.showInTheatres();
   }

  ngOnInit() {
    this.authService.getAuth()
    .subscribe(auth => {
        if (auth) {
          this.logueado = true;
          this.emailUsuario = auth.email;
          this.obtenerUsuario(this.emailUsuario);
        } else {
          this.logueado = false;
        }
    });

    this._opinionesService.cargarMejoresValoradas()
    .subscribe( data => {
      this.mejoresValoradas = data.splice(0, 10);
       console.log('Mejores Valorados: ', this.mejoresValoradas);
     });
  }

  showPopulars() {
      this.moviesService.getPopulars().subscribe( data => {
        this.populars = data.results.splice(0, 8);
      });
  }

  showBoxOffice() {
      this.moviesService.getBoxOffice().subscribe(data => {
        this.boxOffice = data.results.splice(0, 10);
        console.log('Box Office: ', this.boxOffice);
      });
  }

  showInTheatres() {
    this.moviesService.getInTheatres().subscribe(data => {
      this.cines = data.results.splice(0, 10);
      console.log(this.cines);
    });
  }

  masInfo(id) {
    this.router.navigate(['/info', id, 'home']);
  }

  obtenerUsuarios() {
    this._opinionesService.cargarUsuarios()
          .subscribe( data => {
            console.log(data);
          });
  }

  obtenerUsuario(email: string) {
    this._opinionesService.cargarUsuario(email)
          .subscribe( data => {
            this.usuarioActual = data[0];
          });
  }

}
