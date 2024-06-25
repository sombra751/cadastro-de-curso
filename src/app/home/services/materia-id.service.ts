import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaIdService {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) {}

  getMaterias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}materias`);
  }

  getVerificaAtividadeNaoReposdidas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}atividades/respostas`)
  }

}
