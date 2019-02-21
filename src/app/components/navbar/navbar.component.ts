import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OpinionesService } from '../../services/opiniones.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

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

  constructor(public router: Router,
              public authService: AuthService,
              public _opinionesService: OpinionesService ) { }

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
  }

  busqueda(texto) {
    if (texto === '') {
      return;
    }
    this.router.navigate(['search', texto]);
  }

  logout() {
    console.log('Has Salido');
    this.authService.logout();
    this.logueado =  false;
    this.router.navigate(['/home']);
  }

  obtenerUsuario(email: string) {
    this._opinionesService.cargarUsuario(email)
          .subscribe( data => {
            this.usuarioActual = data[0];
          });
  }

  perfil() {
    this.router.navigate(['perfil', this.usuarioActual.uid]);
  }



}
