import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpinionesService } from '../../services/opiniones.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = {
    uid: '',
    email: '',
    nombre: '',
    edad: '',
    genero: '',
    valorados: []
};

  constructor(public activatedRoute: ActivatedRoute,
              public _opinionesService: OpinionesService,
              public router: Router) {

    this.activatedRoute.params.subscribe( params => {
      this._opinionesService.obtenerUsuario(params['idUsuario']).subscribe( data => {
        this.usuario =  data[0];
        console.log('Usuario: ', this.usuario);
      });
    });
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.edad = usuario.edad;
    this.usuario.genero = usuario.genero;

    this._opinionesService.actualizarUsuario(this.usuario);
  }

  showInfo(id: string) {
    this.router.navigate(['info', id, 'perfil']);
  }

}
