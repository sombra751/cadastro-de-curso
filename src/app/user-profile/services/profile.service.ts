import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly baseAPI = `${environment.API}`;


  constructor(private http: HttpClient) { }


  loadCursoById(cursoId: any) {
    return this.http.get<any>(`${this.baseAPI}cursos/${cursoId}`).pipe(take(1))
  }
  loadRolesById(roleId: any) {
    return this.http.get<any>(`${this.baseAPI}role/${roleId}`).pipe(take(1))
  }
}
