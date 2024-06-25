import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from 'src/app/cursos/cursos';
import { crudService } from 'src/app/shared/crud-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Alunos2Service  extends crudService<Curso>{

  constructor(protected override  http: HttpClient) {
    super(http, `${environment.API}usuarios`);
   }
}
