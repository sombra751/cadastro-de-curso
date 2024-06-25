import { AdminService } from './../service/admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { Admin } from '../admin';

@Injectable({
  providedIn: 'root'
})
export class AdminResolverGuard implements Resolve<Admin> {
  constructor(private adminService: AdminService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Admin> {
    if (route.params && route.params['id']) {
      // Assuming loadById returns an Observable<Admin>
      return this.adminService.loadById(route.params['id']).pipe(
        tap(admin => console.log('Resolved Admin:', admin))
      );
    }
    return of({
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
        password: null,
    });
  }
  
  
  
}
