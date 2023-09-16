import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from '../shared/alert-modal.service';
import { LoginService } from './service/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any
  login!: FormGroup
  hide = true;

  constructor(private fb: FormBuilder, private alertService: AlertModalService, private loginService: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hasError(field: string) {
    return this.login.get(field)?.errors;
  }

  logindata(login: FormGroup) {
    const { username, password } = this.login.value


    this.loginService.authenticateUser(username, password).subscribe(
      (user) => {
        if (user) {
          this.alertService.showAlertSuccess('Usuário autenticado com sucesso');
        }
      },
      (error) => {
        this.alertService.showAlertDanger('Erro ao autenticar usuário');
      }
    );
  }


  // onSubmit() {
  //   const { username, password } = this.login.value;
  //   this.loginService.login(username, password).subscribe(
  //     (response) => {
  //       alert('oi')
  //       this.router.navigate(['/cursos'])
  //     },
  //     (error) => {
  //       alert('não')
  //     }
  //   );
  // }
}

