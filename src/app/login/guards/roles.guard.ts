import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../service/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(private authService: AutenticacaoService, private router: Router) {}

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['testes'] as string[];

    // Verifica se o usuário está autenticado
    if (!this.authService.usuarioEstaAutenticado()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Obtém as funções do usuário a partir do serviço de autenticação
    const userRoles = this.authService.usuarioRole;

    // Verifica se o usuário possui todas as funções necessárias
    const hasRequiredRoles = requiredRoles.every(role => userRoles.includes(role));

    if (!hasRequiredRoles) {
      // Redireciona para a página de acesso negado se o usuário não tiver as funções necessárias
      console.log('não é o', hasRequiredRoles)
    }

    return hasRequiredRoles;
  }
}