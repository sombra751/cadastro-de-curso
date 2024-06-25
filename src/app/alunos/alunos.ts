import { Curso } from "../cursos/cursos";

export interface Aluno {
  id: number | any;
  nome: string | any;
  telefone: string | any; // Alterei para string, pois o telefone parece ser uma string
  email: string | any;
  numero: string | any;
  complemento: string | any;
  rua: string | any;
  bairro: string | any;
  cidade: string | any;
  estado: string | any;
  cep: string | any;
  password: string | any;
  testes: Testes[];
  matriculas: Matriculas[]
}


export interface Testes {
  id: string | any
  nome: string | any
  usuarioId: string | any
  roleId: string | any
}

export interface Matriculas {
  id: string | any
  estudante_id: string | any
  curso_id: number | any
}