import { Aluno } from './../../alunos/alunos';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MateriasService } from '../service/materias.service';
import { Materia } from '../materias';

@Injectable({
  providedIn: 'root'
})
export class MateriaResolverGuard implements Resolve<Materia> {
  constructor(private materiasService: MateriasService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Materia> {
    if (route.params && route.params['id']) {
      // Assuming loadById returns an Observable<Curso>
      return this.materiasService.loadById(route.params['id']);
      
    }
    return of(
      {
        id: null,
        nome: null,
        curso_id: [],
        youtubeUrl: null,
      } // Provide a dummy Curso object
    );
  }
}
