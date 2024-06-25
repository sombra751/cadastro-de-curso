import { UserService } from './user.service';
import { Observable, map, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../user';


interface AuthResponse {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl = environment.API;
   usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  usuarioRole: string[] = []; // Corrigido para ser um array de strings
  usuario: any[] = [];
  autenticado!: boolean;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  autenticar(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}auth/login`, { email, password }, { observe: 'response' }).pipe(
      tap((response) => {
        console.log(response);

        const userId = response.body?.userId;

        this.http.get<any>(`${this.apiUrl}usuarios/${userId}`).subscribe(
          (user: any) => {
            this.usuario = user;
console.log('usuario service login', this.usuario)
            if (Array.isArray(user)) {
              user.forEach((res: any) => {
                if (Array.isArray(res.testes)) {
                  res.testes.forEach((testes: any) => {
                    this.usuarioRole.push(testes.roleId); // Corrigido para adicionar à array
                  });
                }
              });
            } else {
              // Se for um único usuário
              if (Array.isArray(user.testes)) {
                user.testes.forEach((testes: any) => {
                  this.usuarioRole.push(testes.roleId); // Corrigido para adicionar à array
                });
              }
            }

            this.mostrarMenuEmitter.emit(true);
            this.usuarioAutenticado = true;
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Erro ao obter informações do usuário', error);
          }
        );
      })
    );
  }

  temPermissao(roles: string[]): boolean {
    return Array.isArray(this.usuarioRole) && this.usuarioRole.some((userRole: any) => roles.includes(userRole));
  }

  verificaToken(usuario: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}usuarios`, usuario);
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}

  // temPermissao(roles: string[]): boolean {
  //     return Array.isArray(this.usuarioRole) && this.usuarioRole.some((userRole: any) => roles.includes(userRole));
  // }



//   verificaToken(usuario: any) {
//     return this.http.post<AuthResponse>(`${this.apiUrl}usuarios`, usuario)
//   }

//   usuarioEstaAutenticado() {
//     return this.usuarioAutenticado
//   }
// }


