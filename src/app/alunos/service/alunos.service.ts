import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluno } from '../alunos';
import { Curso } from 'src/app/cursos/cursos';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private readonly API = `${environment.API}alunos`;

  constructor(private http: HttpClient) { }
  
  getTodosCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${environment.API}cursos`);
  }

  
  list() {
    return this.http.get<Aluno[]>(this.API)
    .pipe(
     delay(2000),
     tap(console.log)
     )
   }
   
   loadById(id: any) {
     return this.http.get<Aluno>(`${this.API}/${id}`).pipe(take(1))
    }

    getTodasMaterias(): Observable<Curso[]> {
      return this.http.get<Curso[]>(`${this.API}/materias`);
    }
  
    private create(aluno: any) {
     return this.http.post(this.API, aluno).pipe(take(1))
   }

    private update(aluno: any) {
      return this.http.put(`${this.API}/${aluno.id}`, aluno).pipe(take(1))
   }
 
 
   save(aluno: any) {
     if(aluno.id) {
       return this.update(aluno)
     }
     return this.create(aluno)
   }
   remove(id: any) {
     return this.http.delete(`${this.API}/${id}`).pipe(take(1))
   }
 }
