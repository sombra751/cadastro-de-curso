import { Curso } from "../cursos/cursos";

export interface Endereco {
    cep: string  | any;
    numero: string  | any;
    complemento?: string  | any;
    rua: string  | any;
    bairro: string  | any;
    cidade: string  | any;
    estado: string  | any;
  }

export interface Aluno {
    id: number | any,
    nome: string | any
    curso: Curso[];
    telefone: number | any
    email: string | any,
    endereco: Endereco;
}