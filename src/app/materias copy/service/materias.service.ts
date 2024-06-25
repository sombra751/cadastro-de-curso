import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { delay, tap, take } from 'rxjs/operators';
import { Materia } from '../materias';
import { Curso } from 'src/app/cursos/cursos';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private readonly baseAPI = `${environment.API}materias`;


  constructor(private http: HttpClient) { }

  getTodosCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${environment.API}cursos`);
  }

  list() {
   return this.http.get<Materia[]>(this.baseAPI)
   .pipe(
    delay(2000),
    tap(console.log)
   )
  }

  loadById(id: any) {
    return this.http.get<Materia>(`${this.baseAPI}/${id}`).pipe(take(1))
  }

  private create(materia: any) {
    return this.http.post(this.baseAPI, materia).pipe(take(1))
  }

  private update(materia: any) {
    return this.http.put(`${this.baseAPI}/${materia.id}`, materia).pipe(take(1))
  }


  save(materia: any) {
    if(materia.id) {
      return this.update(materia)
    }
    return this.create(materia)
  }
  remove(id: any) {
    return this.http.delete(`${this.baseAPI}/${id}`).pipe(take(1))
  }
}
