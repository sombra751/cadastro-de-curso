import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, forkJoin, map, mergeMap, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  getCursos() {
    return this.http.get<any>(`${this.API}cursos`)
  }

  loadById(id: any) {
    return this.http.get<any>(`${this.API}cursos/${id}`).pipe(take(1))
  }

  listTudo(id: any) {
    return this.http.get<any[]>(`${this.API}cursos-detalhes/${id}`)
   }
   
   getCursoComDetalhes(cursoId: number): Observable<any> {
    return this.http.get<any>(`${this.API}cursos-detalhes/${cursoId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao obter detalhes do curso:', error);
          return throwError('Erro interno do servidor'); // Ou qualquer outra manipulação de erro desejada
        })
      );
  }
  

  // getMateriasDoCurso(cursoId: any) {
  //   return this.http.get<any>(`${this.API}/materias/?cursoId=${cursoId}`)
  // }

  // obterMateriasPorCurso(cursoNome: any): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.API}materias?curso=${cursoNome}`);
  // }

  obterMateriasPorCurso(cursoNome: any): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.API}materias?curso=${cursoNome}`).pipe(
    
      mergeMap(materias => {


        const requests = materias.map(materia => 
          this.http.get<any[]>(`${this.API}materias/${materia.id}/aulas`)
            .pipe(map(aulas => ({ ...materia, aulas })))
        );
  
        return forkJoin(materias);
      })
    );
  }
  

  obterMateriaPorId(materiaId: number): Observable<any> {
    const url = `${this.API}materias/${materiaId}`;
    return this.http.get<any>(url);
  }

  getAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}alunos`)
  }

  obterAlunosDoCurso(curso: any): Observable<number | any> {
    return this.getAlunos().pipe(
      map((alunos: any[]) => {
        let contador = 0;
        alunos.forEach((aluno: any) => {
          if (aluno.curso === curso) {
            contador++;
          }
        });
        return contador;
      })
    );
  }

  getMateriaById(id: any): Observable<any> {
    return this.http.get<any>(`${this.API}materias/${id}`);
  }

}
