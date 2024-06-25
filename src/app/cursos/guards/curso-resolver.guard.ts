import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../cursos';
import { CursosService } from '../service/cursos.service';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private cursosService: CursosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Curso> {
    if (route.params && route.params['id']) {
      // Assuming loadById returns an Observable<Curso>
      return this.cursosService.loadById(route.params['id']);
    }
    return of(
      {
        id: null,
        nome: null,
        descricao: null,
        duracao: null,
        docente_id: null
      } // Provide a dummy Curso object
    );
  }
}
