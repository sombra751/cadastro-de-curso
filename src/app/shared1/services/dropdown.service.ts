import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br.model';
import { Cidade } from '../models/cidade';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/json/estadosbr.json')
  }

  getCidades(idEstado: number): any {
    return this.http.get<Cidade[]>('assets/json/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter((c: any) => c.estado == idEstado))
    )
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias() {
    return [
      {nome: 'vue', desc: 'Vue'},
      {nome: 'java', desc: 'Java'},
      {nome: 'react', desc: 'React'},
      {nome: 'angular', desc: 'Angular'}
    ]
  }

  getNewslatter() {
    return [
      { valor: 's', desc: 'sim' },
      { valor: 'n', desc:'não' }
    ]
  }
}
