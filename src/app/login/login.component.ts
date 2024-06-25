import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from '../shared/alert-modal.service';
import { LoginService } from './service/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutenticacaoService } from './service/autenticacao.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any
  login!: FormGroup
  hide = true;
  // mostrarMenuEmitter = new EventEmitter<boolean>(true);
  private usuarioAutenticado: boolean = false
  private usuarioAtual!: User | any;


  constructor(private fb: FormBuilder, private alertService: AlertModalService, private loginService: LoginService, private http: HttpClient, private router: Router, private authService: AutenticacaoService,) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  hasError(field: string) {
    return this.login.get(field)?.errors;
  }

  // logindata(login: FormGroup) {
  //   const { username, password } = this.login.value


  //   this.loginService.authenticateUser(username, password).subscribe(
  //     (user) => {
  //       if (user) {
  //         this.alertService.showAlertSuccess('Usuário autenticado com sucesso');
  //       }
  //     },
  //     (error) => {
  //       this.alertService.showAlertDanger('Erro ao autenticar usuário');
  //     }
  //   );
  // }

  logindata() {
    const email = this.login.value.email;
    const password = this.login.value.password;

    this.authService.autenticar(email, password).subscribe({
      next: (value) => {
        console.log("login realizado", this.login.value)
        // this.mostrarMenuEmitter.emit(true)
        this.usuarioAutenticado = true;
        this.router.navigate(['/'])

      },
      error: (err) => {
        console.log('erro no login', err)
      }
    })
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

