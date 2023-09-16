import { LoginService } from './../login/service/login.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private loginService:LoginService,
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
    console.log('canActivate')
   return this.verificarAcesso()
  }

private verificarAcesso() {
  if(this.loginService.usuarioEstaAutenticado()) {
    return true
  }
  this.router.navigate(['/login']);

  return false
}

  canLoad(
    route: Route, 
    ): Observable<boolean> | Promise<boolean> | boolean {
      console.log('canLoad: usuario pode carregar')
      return this.verificarAcesso()
  }
}
