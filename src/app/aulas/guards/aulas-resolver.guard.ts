import { AulasService } from './../service/aulas.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Aulas } from '../aula';

@Injectable({
  providedIn: 'root'
})
export class AulasResolverGuard implements Resolve<Aulas> {
  constructor(private aulasService: AulasService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Aulas> {
    if (route.params && route.params['id']) {
      // Assuming loadById returns an Observable<Curso>
      return this.aulasService.loadById(route.params['id']);
    }
    return of(
      {
        id: null,
        nome: null,
        youtubeUrl: null,
        materia_id: [],
        Atividades: []
      } // Provide a dummy Curso object
    );
  }
  
}
