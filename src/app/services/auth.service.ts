import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<Usuario>;
  usuarioLogueado: boolean;
  usuarioActual: Usuario;
  idUsuario: string;
  emailUsuario: string;

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap( user => {
            if (user) {
              return this.afs.doc<Usuario>(`usuarios/${user.uid}`).valueChanges();
            } else {
              return of(null);
            }
        })
      );
     }

  registerUser(email: string, password: string) {
    return new Promise ((res, rej) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( userData => res(userData.user),
      err => rej(err));
    });
  }

  loginEmail(email: string, password: string) {
    return new Promise ((res, rej) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( userData => {
        res(userData.user);
      },
      err => rej(err));
    });
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    this.usuarioLogueado = false;
    this.idUsuario = '';
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('logueado');
    return this.afAuth.auth.signOut();
  }

  actualizarInfoUsuario(usuario, nombre, edad, genero) {
    const userRef: AngularFirestoreDocument<Usuario> =  this.afs.doc(`usuarios/${usuario.uid}`);

    const data = {
        uid: usuario.uid,
        email: usuario.email,
        nombre: nombre,
        edad: edad,
        genero: genero,
        valorados: []
    };

    return userRef.set(data, {merge: true});
}

}
