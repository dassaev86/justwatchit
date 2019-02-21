import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pelicula } from '../models/peliculas.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {

  usuarioCollection: AngularFirestoreCollection<Usuario>;
  peliculaCollection: AngularFirestoreCollection<Pelicula>;
  usuarios: Observable<Usuario[]>;
  usuario: Observable<Usuario[]>;
  pelicula: Observable<Pelicula[]>;
  usuarioDoc: AngularFirestoreDocument<Usuario>;
  peliculaDoc: AngularFirestoreDocument<Pelicula>;


  constructor(public afs: AngularFirestore) {
    this.peliculaCollection = this.afs.collection<Pelicula>('peliculas');
  }

  cargarUsuarios() {
    this.usuarioCollection = this.afs.collection('usuarios', ref => ref.orderBy('uid', 'asc'));
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
      map( changes => {
        return changes.map( a => {
          const data = a.payload.doc.data() as Usuario;
          data.uid = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.usuarios;
  }

    cargarUsuario(email: string) {
    this.usuarioCollection = this.afs.collection('usuarios', ref => ref.orderBy('uid', 'asc').where('email', '==', email));
    this.usuario = this.usuarioCollection.snapshotChanges().pipe(
      map( changes => {
        return changes.map( a => {
          const data = a.payload.doc.data() as Usuario;
          data.uid = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.usuario;
  }

  obtenerUsuario(id: string) {
    this.usuarioCollection = this.afs.collection('usuarios', ref => ref.orderBy('email', 'asc').where('uid', '==', id));
    this.usuario = this.usuarioCollection.snapshotChanges().pipe(
      map( changes => {
        return changes.map( a => {
          const data = a.payload.doc.data() as Usuario;
          data.uid = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.usuario;
  }

  actualizarUsuario(usuario: Usuario) {
    this.usuarioDoc = this.afs.doc(`usuarios/${usuario.uid}`);
    this.usuarioDoc.update(usuario);
  }

  agregarOpinion(usuario: Usuario) {
    this.usuarioDoc = this.afs.doc(`usuarios/${usuario.uid}`);
    this.usuarioDoc.update(usuario);
  }

/*  actualizarPelicula(pelicula: Pelicula) {
    const movieRef: AngularFirestoreDocument<Pelicula> =  this.afs.doc(`peliculas/${pelicula.uid}`);

    const data = {
        uid: pelicula.idMovie,
        valoraciones: pelicula.valoraciones
    };

    return movieRef.set(data, {merge: true});
} */

agregarPelicula(pelicula: Pelicula) {
  this.peliculaCollection.add(pelicula);
}

agregarValoracionPelicula(pelicula: Pelicula) {
  this.peliculaDoc =  this.afs.doc(`peliculas/${pelicula.uid}`);
  this.peliculaDoc.update(pelicula);
}

cargarPelicula(movieId: string) {
  this.peliculaCollection = this.afs.collection('peliculas', ref => ref.orderBy('valoraciones', 'asc').where('movieId', '==', movieId));
  this.pelicula = this.peliculaCollection.snapshotChanges().pipe(
    map( changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as Pelicula;
        data.uid = a.payload.doc.id;
        return data;
      });
    })
  );

  return this.pelicula;
}

cargarMejoresValoradas() {
  this.peliculaCollection = this.afs.collection('peliculas', ref => ref.orderBy('positivas', 'desc').where('positivas', '>', 0));
  this.pelicula = this.peliculaCollection.snapshotChanges().pipe(
    map( changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as Pelicula;
        data.uid = a.payload.doc.id;
        return data;
      });
    })
  );

  return this.pelicula;
}





}
