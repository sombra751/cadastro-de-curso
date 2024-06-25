import { Aluno } from './../../alunos/alunos';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlunosService } from '../service/alunos.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoResolverGuard implements Resolve<Aluno> {
  constructor(
    private alunosService: AlunosService
  ) {

  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Aluno> {
    if (route.params && route.params['id']) {
      // Assuming loadById returns an Observable<Curso>
      return this.alunosService.loadById(route.params['id']);
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
        testes: [],
        matriculas: []
      } // Provide a dummy Curso object
    );
  }
}