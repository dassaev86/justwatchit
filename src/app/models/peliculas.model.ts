import { Valoraciones } from './valoraciones.model';
export interface Pelicula {
    uid?: string;
    movieId?: string;
    nombre?: string;
    positivas?: number;
    valoraciones?: Valoraciones[];
}
