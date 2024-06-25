import { Component, OnInit } from '@angular/core';
import { Home } from '../home';
import { HomeService } from '../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-curso-id',
  templateUrl: './curso-id.component.html',
  styleUrls: ['./curso-id.component.scss']
})
export class CursoIdComponent implements OnInit {
  curso: Home | any;
  // cursoNome!: string;
  // materias!: any[];
  // aulas!: any[];
  cursoAll: any[] = []

  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router, private location: Location) { }
  vezesIniciadas: number = 0;
  cursoDetalhes: any;


  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.curso = data['curso']; // Assume-se que o resolvedor está configurado para fornecer um objeto Curso
    });


    // this.homeService.listTudo(this.curso.id).subscribe((dados) => {
    //   this.cursoAll = dados;
    //   console.log(this.cursoAll)
    // });
    this.getCursoDetalhes(this.curso.id);


    // this.cursos = this.lista.getCursos();
    // console.log(this.cursos)


    //  const cursoId = this.route.snapshot.data['curso']
    //   console.log(cursoId)

    // this.homeService.obterMateriasPorCurso(this.curso.nome).subscribe(dados => this.materias = dados)


    // this.homeService.obterMateriasPorCurso(this.curso.id).subscribe(dados => {
    //   this.materias = Object.values(dados);
    //   console.log(this.materias)

    //   // Aqui você pode extrair as informações das aulas, se necessário
    //   this.aulas = this.extractAulasFromMaterias(this.materias);
    // });
  }


  
  getCursoDetalhes(cursoId: number): void {
    this.homeService.getCursoComDetalhes(cursoId).subscribe(
      (cursoDetalhes) => {
        this.cursoDetalhes = cursoDetalhes;
      },
      (error) => {
        console.error('Erro ao obter detalhes do curso:', error);
        // Trate o erro conforme necessário (por exemplo, exibindo uma mensagem de erro)
      }
    );
  }

  // private extractAulasFromMaterias(materias: any[]): any[] {
  //   let aulas: any[] = [];

  //   materias.forEach(materia => {
  //     if (materia.aulas) {
  //       aulas = aulas.concat(materia.aulas);
  //     }
  //   });

  //   return aulas;
  // }

  // onView(id: any) {
  //   this.router.navigate(['materia', id], { relativeTo: this.route });
  // }
  onView(id: any) {
    this.router.navigate(['aluno/materia', id]);
  }

  // iniciarQuestao() {
  //   if (this.vezesIniciadas < 2) {
  //     this.vezesIniciadas++;
  //     this.router.navigate(['home/questoes']);
  //   } else {
  //     alert('Você já iniciou as questões duas vezes.');
  //   }
  // }

  voltar() {
    this.location.back();
  }
}
