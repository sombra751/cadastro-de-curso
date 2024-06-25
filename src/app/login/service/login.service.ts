import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mostrarMenuEmitter = new EventEmitter<boolean>();
  private readonly baseAPI = `${environment.API}admins`;
  private usuarioAutenticado: boolean = false
  private usuarioAtual!: User | any;

  constructor(private http: HttpClient, private router: Router) { }


  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseAPI}`)
      .pipe(
        map((res: any) => {
          const user = res.find((user: any) => user.username === username && user.password === password);
          if(user) {
            this.mostrarMenuEmitter.emit(true)
            this.usuarioAutenticado = true;
            this.router.navigate(['/'])
            this.usuarioAtual = user;
          } else {
            this.mostrarMenuEmitter.emit(false)
            this.usuarioAutenticado = false;
            this.usuarioAtual = null;
          }
          return user
        })
      );
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado
  }

  getUsers():Observable<any> {
    return this.http.get<any>(`${this.baseAPI}`)
  }

  getUsuarioAutenticado() {
    return this.usuarioAtual;
  }

  logout() {
    this.mostrarMenuEmitter.emit(false);
    this.usuarioAutenticado = false;
    this.router.navigate(['/login']);
  }
}