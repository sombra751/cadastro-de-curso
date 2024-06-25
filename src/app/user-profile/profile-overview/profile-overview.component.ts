import { Matriculas } from './../../alunos/alunos';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/login/service/autenticacao.service';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],


})
export class ProfileOverviewComponent implements OnInit {
  usuario: any
  cursos: any
  roles: any
  matriculas!: any


  constructor(
    private authService: AutenticacaoService, 
    private profileService: ProfileService, 
    private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.authService.usuario

    this.usuario
    console.log("usuario perfil",this.usuario)

    if (this.usuario.matriculas && this.usuario.matriculas.length > 0) {
      this.usuario.matriculas.forEach((matricula: any) => {
        this.cursos = matricula
      });
    }
    if (this.usuario.testes && this.usuario.testes.length > 0) {
      this.usuario.testes.forEach((role: any) => {
        this.roles = role
        console.log("role:",this.roles)
      });
    }

    this.profileService.loadCursoById(this.cursos.curso_id).subscribe(
      (curso: any) => {
        this.cursos = curso
        console.log(this.cursos)
      })

    this.profileService.loadRolesById(this.roles.roleId).subscribe(
      (role: any) => {
        this.roles = role
      })
  }

  onView(id: number) {
    this.router.navigate(['/aluno/curso', id]);
  }

}
