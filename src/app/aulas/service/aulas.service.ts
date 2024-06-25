import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aulas } from '../aula';

@Injectable({
  providedIn: 'root'
})
export class AulasService {
  private readonly baseAPI = `${environment.API}aulas`;


  constructor(private http: HttpClient) { }


  postAlternativas(alternativa: any) {
    return this.http.post(`${this.baseAPI}/alternativas`, alternativa).pipe(take(1))
  }
  postAtividades(alternativa: any) {
    return this.http.post(`${this.baseAPI}/atividades`, alternativa).pipe(take(1))
  }
  // postAulas(alternativa: any) {
  //   return this.http.post(`http://localhost:3600/aulas`, alternativa).pipe(take(1))
  // }

  list() {
   return this.http.get<Aulas[]>(this.baseAPI)
   .pipe(
    delay(2000),
    tap(console.log)
   )
  }

  loadById(id: any) {
    return this.http.get<Aulas>(`${this.baseAPI}/${id}`).pipe(take(1))
  }

  private create(aula: any) {
    return this.http.post(this.baseAPI, aula).pipe(take(1))
  }

  private update(aula: any) {
    return this.http.put(`${this.baseAPI}/${aula.id}`, aula).pipe(take(1))
  }


  save(aula: any) {
    if(aula.id) {
      return this.update(aula)
    }
    return this.create(aula)
  }
  remove(id: any) {
    return this.http.delete(`${this.baseAPI}/${id}`).pipe(take(1))
  }
}
