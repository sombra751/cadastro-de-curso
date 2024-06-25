import { delay, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Docente } from '../docente';
import { Observable } from 'rxjs';
import { Testes } from 'src/app/alunos/alunos';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private readonly API = `${environment.API}usuarios`;

  constructor(private http: HttpClient) { }

  list() {
   return this.http.get<Docente[]>(this.API)
   .pipe(
    delay(2000),
    tap(console.log)
   )
  }

  loadById(id: any) {
    return this.http.get<Docente>(`${this.API}/${id}`).pipe(take(1))
  }
  
  getRoles(): Observable<Testes[]> {
    return this.http.get<Testes[]>(`http://localhost:3600/role`);
  }

  getDocentes() {
    return this.http.get<Docente[]>(`http://localhost:3600/usuarios-docente`)
   .pipe(
    delay(2000),
    tap(console.log)
   )
  }
  
  private create(docente: any) {
    return this.http.post(this.API, docente).pipe(take(1))
  }

  private update(docente: any) {
    return this.http.put(`${this.API}/${docente.id}`, docente).pipe(take(1))
  }


  save(docente: any) {
    if(docente.id) {
      return this.update(docente)
    }
    return this.create(docente)
  }
  remove(id: any) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }
}

