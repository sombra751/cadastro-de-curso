import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Materia } from 'src/app/materias/materias';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  getQuestoes(): Observable<any[]> {
    return this.http.get<Materia[]>(`${this.API}materias`);
  }

  getAtividades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}atividades`);
  }
  salvarResposta(atividadeId: any, respondido: boolean): Observable<any[]> {
    return this.http.post<any[]>(`${this.API}respostas`, { atividade_id: atividadeId, respondido }).pipe(
      catchError((error) => {
        console.error('Erro ao salvar resposta:', error);
        return throwError(error);
      })
    );
  }

  getAtividadesRespondida(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}respostas`);
  }
}
