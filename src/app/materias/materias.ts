import { Curso } from "../cursos/cursos";

export interface Materia {
    id: number | any;
    nome: string | any;
    youtubeUrl: string 
    curso: Curso[];
}