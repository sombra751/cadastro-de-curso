import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { EventEmitter, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  mostrarMenuEmitter = new EventEmitter<boolean>();

  private userSubject = new BehaviorSubject<any>(null)

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
   }

   decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as any
    this.userSubject.next(user)
   }

   retornarUser() {
    return this.userSubject.asObservable();
   }

   salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT()
   }

   logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
   }

   estaLogado() {
    this.mostrarMenuEmitter.emit(true)
    return this.tokenService.possuiToken()
   }

}
