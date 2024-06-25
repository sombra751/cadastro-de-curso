import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cursos2Service } from 'src/app/cursos/service/cursos2.service';
import { Home } from '../home';
import { HomeService } from '../services/home.service';
import { UserService } from 'src/app/login/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cursos!: Observable<Home[]>
  quantidadeDeAlunos!: Observable<any[]>

  constructor(
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    ) { 
    this.cursos = this.homeService.getCursos()
   
  }

  ngOnInit(): void {
  }

  onView(id: any) {
    this.router.navigate(['curso', id], { relativeTo: this.route });
  }

  alunosDoCurso(cursoNome: any) {
    cursoNome = this.cursos
    this.homeService.obterAlunosDoCurso(cursoNome).subscribe(contagem => {
      console.log(`A quantidade de alunos no curso Vue é: ${contagem}`);
    });
  }

  sair() {
    this.userService.logout()
  }

}