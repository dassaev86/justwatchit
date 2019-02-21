import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  nombre: string;
  edad: string;
  genero: string;

  constructor(public authService: AuthService,
              public router: Router) { }

  ngOnInit() {
    this.edad = 'Selecciona';
    this.genero = 'Selecciona';
  }

  registrarUsuario() {
    this.authService.registerUser(this.email, this.password)
          .then( (res) => {
              console.log('Registro Correcto');
              console.log(res);
              this.authService.actualizarInfoUsuario(res, this.nombre, this.edad, this.genero);
              this.authService.logout();
              this.router.navigate(['/login']);
          }).catch((err) => {
            console.log(err);
          });
  }

}
