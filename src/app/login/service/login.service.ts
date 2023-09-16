import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mostrarMenuEmitter = new EventEmitter<boolean>();
  apiurl = 'http://localhost:5000'
  private usuarioAutenticado: boolean = false
  private usuarioAtual!: User | any;

  constructor(private http: HttpClient, private router: Router) { }


  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.get<any>('http://localhost:5000/user')
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
    return this.http.get<any>('http://localhost:5000/user')
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