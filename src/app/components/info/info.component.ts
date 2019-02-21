import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { AuthService } from '../../services/auth.service';
import { OpinionesService } from '../../services/opiniones.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Pelicula } from '../../models/peliculas.model';
import { stringify } from '@angular/compiler/src/util';
import { Valoraciones } from 'src/app/models/valoraciones.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styles: []
})
export class InfoComponent implements OnInit {
  movie: any = {
    release_date: '',
    backdrop_path: '',
    original_title: ''
  };
  cast: any = {
    cast: ['', '', '']
  };
  id: string;
  origen: string;
  word = '';
  califNumero = 3;
  letras = 150;
  mostrarDivOpinion = false;
  mostrarOpinionPublicada = false; // esta sera la que muestre el div posterior a la publicacion de la opinion
  indexValorados: number;
  caracteresExcedidos = false;
  usuarioActual: Usuario;
  microresena: string;
  positivas = 0;
  porcentajePositivo: string;
  porcentajeNegativo: string;
  peliculaActual: Pelicula = {
    movieId: '',
    nombre: '',
    positivas: 0,
    valoraciones: []
  };


  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              public authService: AuthService,
              public _opinionesService: OpinionesService,
              private moviesService: MoviesService
   ) {

               this.activeRoute.params.subscribe( params => {
                 this.showInfo(params['id']);
                 this.showCast(params['id']);
                 this.id = params['id'];
                 this.origen = params['origen'];
                 this.word = params['word'];
               });

               if (localStorage.getItem('logueado') === 'true') {
                this.obtenerUsuario(localStorage.getItem('email'));
               }



                this._opinionesService.cargarPelicula(this.id)
                            .subscribe( movie => {
                              if (movie.length <= 0) {
                                this.generarRegistroPelicula();
                              } else {
                                this.peliculaActual = movie[0];
                                this.obtenerValorTotal();
                              }
                            });



              }

  ngOnInit() {}

  showInfo(id) {
    this.moviesService.getMovie(id).subscribe(data => {
      this.movie = data;
      this.peliculaActual.nombre = data.original_title;
      console.log(this.movie);
    });
  }

  showCast(id) {
    this.moviesService.getCast(id).subscribe(data => {
      this.cast = data;
      console.log('Cast: ', this.cast);
    });
  }

  return() {

    if (this.origen === 'search') {
      this.router.navigate(['/' + this.origen, this.word]);
    } else if (this.origen === 'perfil') {
      this.router.navigate(['/' + this.origen, this.usuarioActual.uid]);
    } else {
      this.router.navigate(['/' + this.origen ]);
    }
  }

  calificar(calif: string) {
    // tslint:disable-next-line:radix
    this.califNumero = parseInt(calif);
  }

  publicarOpinion(valor: string) {
    const opinion = {
      valor: this.califNumero,
      movie: this.id,
      micro: this.microresena || '',
      nombre: this.movie.original_title,
      imagen: this.movie.poster_path
    };

    for (let i = 0; i < this.usuarioActual.valorados.length; i++) {
        if (this.usuarioActual.valorados[i].movie === this.id) {
              this.usuarioActual.valorados.splice(i, 1);
        }
    }

    this.usuarioActual.valorados.push(opinion);
    console.log(this.usuarioActual);
    this._opinionesService.agregarOpinion(this.usuarioActual);

    //

    const valoracion: Valoraciones = {
      idUsuario: this.usuarioActual.uid,
      nombreUsuario: this.usuarioActual.nombre,
      edadUsuario: this.usuarioActual.edad,
      generoUsuario: this.usuarioActual.genero,
      valor: opinion.valor,
      micro: opinion.micro
    };


    for (let i = 0; i < this.peliculaActual.valoraciones.length; i++) {
      if (this.usuarioActual.uid === this.peliculaActual.valoraciones[i].idUsuario) {
            this.peliculaActual.valoraciones.splice(i, 1);
      }
  }

    this.peliculaActual.valoraciones.push(valoracion);

     // Sacar porcentaje positivo
    this.calcularPorcentajePositivo();
    // Fin Sacar porcentaje positivo

    this._opinionesService.agregarValoracionPelicula(this.peliculaActual);

    //

    this.mostrarDivOpinion = false;
    this.mostrarOpinionPublicada = true;

  }

  contar(resena: string) {
    if (resena.length > 150) {
      this.caracteresExcedidos = true;
    } else {
      this.caracteresExcedidos = false;
    }
    this.letras = 150 - resena.length;
    this.microresena = resena;
  }

  opinar() {
    if (localStorage.getItem('logueado') !== 'true') {
        this.showSwal();
        return;
    } else {
      this.mostrarDivOpinion = true;
      this.mostrarOpinionPublicada = false;
      this.obtenerUsuarioPorPublicar(localStorage.getItem('email'));
    }
  }

  obtenerUsuario(email: string) {
    this._opinionesService.cargarUsuario(email)
          .subscribe( data => {
            this.usuarioActual = data[0];
            console.log('Usuario Actual: ', this.usuarioActual);
            this.opinionPublicada();
          });
  }

  obtenerUsuarioPorPublicar(email: string) {
    this._opinionesService.cargarUsuario(email)
          .subscribe( data => {
            this.usuarioActual = data[0];
            console.log('Usuario Actual: ', this.usuarioActual);
          });
  }

  generarRegistroPelicula() {
    this.peliculaActual.movieId = this.id;
    this._opinionesService.agregarPelicula(this.peliculaActual);
    this._opinionesService.cargarPelicula(this.id)
          .subscribe(movie => {
            this.peliculaActual = movie[0];
            this.obtenerValorTotal();
          });
  }

  obtenerValorTotal() {

    let valor = 0;
    let valorPositivo = 0;
    let valorNegativo = 0;

    for (let i = 0; i < this.peliculaActual.valoraciones.length; i++) {
        // tslint:disable-next-line:radix
        valor = this.peliculaActual.valoraciones[i].valor;
        if (valor <= 2) {
          valorNegativo++;
        } else {
          valorPositivo++;
        }
    }

    if (this.peliculaActual.valoraciones.length === 0) {
      this.porcentajePositivo = stringify(Math.round(valorPositivo)) + '%';
      this.porcentajeNegativo = stringify(Math.round(valorNegativo)) + '%';
      return;
    }



    valorPositivo = (valorPositivo * 100) /  this.peliculaActual.valoraciones.length;
    valorNegativo = (valorNegativo * 100) /  this.peliculaActual.valoraciones.length;

    this.peliculaActual.positivas = valorPositivo;

    this.porcentajePositivo = stringify(Math.round(valorPositivo)) + '%';
    this.porcentajeNegativo = stringify(Math.round(valorNegativo)) + '%';
    console.log('PP2: ', this.porcentajePositivo);
    console.log('PN2: ', this.porcentajeNegativo);
  }

  opinionPublicada() {
    for (let i = 0; i < this.usuarioActual.valorados.length; i++) {
      if (this.usuarioActual.valorados[i].movie === this.id) {
          this.indexValorados = i;
          this.mostrarOpinionPublicada =  true;
          return;
      }
    }
  }

  eliminarOpinion(id: string, usuarioId: string) {
    for (let i = 0; i < this.usuarioActual.valorados.length; i++) {
      if (this.usuarioActual.valorados[i].movie === id) {
            this.usuarioActual.valorados.splice(i, 1);
      }
  }

  for (let i = 0; i < this.peliculaActual.valoraciones.length; i++) {
    if (this.peliculaActual.valoraciones[i].idUsuario === usuarioId) {
          this.peliculaActual.valoraciones.splice(i, 1);
    }
}

  this.calcularPorcentajePositivo();
  this._opinionesService.agregarOpinion(this.usuarioActual);
  this._opinionesService.agregarValoracionPelicula(this.peliculaActual);
  this.mostrarOpinionPublicada =  false;
  this.mostrarDivOpinion = false;
  }

  calcularPorcentajePositivo() {
        // Sacar porcentaje positivo
  let valorPositivo = 0;
  for (let i = 0; i < this.peliculaActual.valoraciones.length; i++) {
      if (this.peliculaActual.valoraciones[i].valor >= 3) {
        valorPositivo++;
      }
  }
  console.log('Positivas ', valorPositivo);
  console.log('Valoraciones totales ', this.peliculaActual.valoraciones.length);
  console.log('PP: ', this.porcentajePositivo);
  console.log('PN: ', this.porcentajeNegativo);

    this.peliculaActual.positivas = (valorPositivo * 100) / this.peliculaActual.valoraciones.length ;
    // Fin Sacar porcentaje positivo

  this.obtenerValorTotal();
  }

  showSwal() {
    swal('Se requiere estar loguedado', 'Desear ir a página de login?', 'info')
.then((value) => {
  if (value) {
    this.router.navigate(['login']);
  } else {
    return;
  }
});
  }




}
