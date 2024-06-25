import { delay, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Admin } from '../admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API = `${environment.API}admins`;

  constructor(private http: HttpClient) { }

  list() {
   return this.http.get<Admin[]>(this.API)
   .pipe(
    delay(2000),
    tap(console.log)
   )
  }
  
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3600/role`);
  }

  getAdmins() {
    return this.http.get<Admin[]>(`http://localhost:3600/usuarios-admin`)
   .pipe(
    delay(2000),
    tap(console.log)
   )
  }

  loadById(id: any) {
    return this.http.get<Admin>(`${this.API}/${id}`).pipe(take(1))
  }

  private create(admin: any) {
    return this.http.post(this.API, admin).pipe(take(1))
  }

  private update(admin: any) {
    return this.http.put(`${this.API}/${admin.id}`, admin).pipe(take(1))
  }


  save(admin: any) {
    if(admin.id) {
      return this.update(admin)
    }
    return this.create(admin)
  }
  remove(id: any) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }
}
