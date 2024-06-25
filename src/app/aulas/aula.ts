import { Materia } from "../materias/materias";

export interface Alternativa {
  id: number | any;
  texto: string | any;
  alternativaCorreta: boolean | any;
}

export interface Atividade {
  id: number | any;
  pergunta: string | any;
  Alternativas: Alternativa[];
}

export interface Aulas {
  id: number | any;
  nome: string | any;
  youtubeUrl: string | any;
  materia_id: Materia[];
  Atividades: Atividade[];
}
