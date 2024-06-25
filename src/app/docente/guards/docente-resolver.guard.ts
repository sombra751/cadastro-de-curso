import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DocenteService } from '../service/docente.service';
import { Docente } from '../docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteResolverGuard implements Resolve<Docente> {
  constructor(private docenteService: DocenteService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Docente> {
    if (route.params && route.params['id']) {
      // Assuming loadById returns an Observable<Docente>
      return this.docenteService.loadById(route.params['id']);
    }
    return of(
      {
        id: null,
        nome: null,
        telefone: null,
        email: null,
        numero:null,
        complemento:null,
        rua:null,
        bairro:null,
        cidade:null,
        estado:null,
        cep:null,
        // curso_id:[],
        password: null,
      } // Provide a dummy Curso object
    );
  }
}

