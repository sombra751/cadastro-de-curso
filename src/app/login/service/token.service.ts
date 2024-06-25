import { Injectable } from '@angular/core';

const KEY = 'jpl@lita12'

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  
  constructor() { }
  verificarAutenticacao(): boolean {
    const token = this.retornarToken();
    return !!token; // Retorna true se o token existir
  }
  

  salvarToken(token: string) {
    return localStorage.setItem(KEY, token)
  }

  excluirToken() {
    localStorage.removeItem(KEY)

  }

  retornarToken() {
    return localStorage.getItem(KEY) ?? ""
  }

  possuiToken() {
    return !!this.retornarToken()
  }
}
