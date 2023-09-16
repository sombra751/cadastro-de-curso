import { Injectable } from '@angular/core';
import { crudService } from 'src/app/shared/crud-service';
import { Curso } from '../cursos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends crudService<Curso>{

  constructor(protected override  http: HttpClient) {
    super(http, `${environment.API}cursos`);
   }
}
