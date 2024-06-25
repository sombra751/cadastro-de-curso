import { Atividade } from './../../materias/materias';
import { Component, OnInit } from '@angular/core';
import { QuestionarioService } from '../services/questionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.scss']
})
export class QuestionarioComponent implements OnInit {
  questoes!: any[];
  perguntaAtual: number = 0;
  alternativaSelecionada: any;
  tentativa: number = 0;
  atividades!: any[];
  respostas!: any[]

  constructor(private alertService: AlertModalService, private questionarioService: QuestionarioService, private route: ActivatedRoute, private router: Router,private location: Location) { }

  ngOnInit(): void {
    this.questionarioService.getAtividades().subscribe(data => {
      this.questoes = data;
    });

    this.questionarioService.getAtividadesRespondida().subscribe(data => {
      this.respostas = data
    })

    // this.questionarioService.getAtividades().subscribe(data => {
    //   this.atividades = data,
    //   console.log(data);

    // });
  }
  
  responderQuestao() {
    const perguntaAtual = this.questoes[this.perguntaAtual];
    if (perguntaAtual && this.alternativaSelecionada) {
      const alternativaCorreta = perguntaAtual.alternativaCorreta;
      if (this.alternativaSelecionada.texto === alternativaCorreta) {
        console.log(this.perguntaAtual)
        this.alertService.showAlertSuccess('Resposta correta!');
      } else {
        console.log(this.perguntaAtual)
        this.alertService.showAlertDanger('Resposta incorreta!');
      }

      
      const atividadeId = perguntaAtual.id
      this.salvarAtividade(atividadeId, true);

  
      this.perguntaAtual++;
  
      if (this.perguntaAtual >= this.questoes.length) {
        this.alertService.showAlertInfo('Você respondeu todas as perguntas desta tentativa!');

        this.location.back();
        // this.tentativa++;
        // if (this.tentativa < 2) {
        //   this.perguntaAtual = 0;
        //   this.questionarioService.getQuestoes().subscribe(data => {
        //     this.questoes = data.reduce((acc, materia) => {
        //       if (materia.lessons) {
        //         return acc.concat(materia.lessons.slice(0, 2));
        //       }
        //       return acc;
        //     }, []);
        //   });
        // } else {
        //   alert('Você concluiu todas as tentativas!');
        //   this.perguntaAtual = 0;
        //   this.tentativa = 0;
        // }
      }
    }
  }

  salvarAtividade(atividadeId: any, respondido: boolean) {
    this.questionarioService.salvarResposta(atividadeId, respondido)
      .subscribe(
        (response: any) => {
          console.log('Atividade salva com sucesso!', response);
        },
        (error:any) => {
          console.log(atividadeId);
          console.error('Erro ao salvar atividade', error);
        }
      );
  }
  

  cancel() {
    this.location.back();
  }
}  