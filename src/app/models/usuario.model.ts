import { Valorados } from './valorados.model';
export interface Usuario {
    uid: string;
    email: string;
    nombre?: string;
    edad?: string;
    genero?: string;
    valorados?: Valorados[];
}
