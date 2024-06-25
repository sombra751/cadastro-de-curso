import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Home } from '../home';
import { HomeService } from '../services/home.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverGuard implements Resolve<Home> {
  constructor(
    private homeService: HomeService
  ) {

  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Home> {
    if (route.params && route.params['id']) {
      // Assuming loadById returns an Observable<Curso>
      return this.homeService.loadById(route.params['id']);
    }
    return of(
      {
        id: null,
        nome: null,
        descricao: null,
        duracao: null
      } // Provide a dummy Curso object
    );
  }
}
