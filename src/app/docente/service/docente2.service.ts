import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crudService } from 'src/app/shared/crud-service';
import { environment } from 'src/environments/environment';
import { Docente } from '../docente';

@Injectable({
  providedIn: 'root'
})
export class Docente2Service extends crudService<Docente> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}usuarios-docente`);
   }
}
