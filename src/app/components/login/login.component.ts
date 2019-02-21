import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { OpinionesService } from '../../services/opiniones.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  user$: Observable<Usuario>;

  constructor(public authService: AuthService,
              public _opinionesService: OpinionesService,
              public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router) {}

  ngOnInit() {
  }

  login() {
    this.authService.loginEmail(this.email, this.password)
            .then((res: any) => {
              console.log('Login Correcto');
              this.authService.idUsuario =  res.uid;
              this.authService.emailUsuario = res.email;
              this.authService.usuarioLogueado = true;
              localStorage.setItem('email', this.authService.emailUsuario);
              localStorage.setItem('logueado', this.authService.usuarioLogueado.toString());
              this.router.navigate(['/home']);
            }).catch((err) => {
              console.log(err);
              this.router.navigate(['/login']);
            });
  }
}
