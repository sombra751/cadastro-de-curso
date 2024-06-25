import { Curso } from "../cursos/cursos";

export interface Materia {
  id: number | any;
  nome: string | any;
  curso_id: Curso[];
  
}

export interface Aulas {
  id: number,
  nome: any 
  youtubeUrl: any
  atividades: Atividade[];
}

export interface Atividade {
  id: number; // Substitua pelo tipo de dado correto para o ID da lição
  pergunta: string;
  // alternativaCorreta: string; // Substitua pelo tipo de dado correto para a alternativa correta
  alternativas: Alternativa[];
}

export interface Alternativa {
  id: number; // Substitua pelo tipo de dado correto para o ID da alternativa
  texto: string;
  alternativaCorreta: boolean
}
