import { Curso } from "../cursos/cursos";

export interface Materia {
  id: number | any;
  nome: string | any;
  curso: Curso[];
  youtubeUrl: any
  lessons: Lesson[];
}

export interface Lesson {
  id: number; // Substitua pelo tipo de dado correto para o ID da lição
  pergunta: string;
  alternativaCorreta: string; // Substitua pelo tipo de dado correto para a alternativa correta
  alternativas: Alternativa[];
}

export interface Alternativa {
  id: number; // Substitua pelo tipo de dado correto para o ID da alternativa
  texto: string;
}