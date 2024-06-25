import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MateriasService } from 'src/app/materias/service/materias.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ModalAtividadeComponent } from '../modal-atividade/modal-atividade.component';
import { ModalAlternativaComponent } from '../modal-alternativa/modal-alternativa.component';
import { Materia } from 'src/app/materias/materias';
import { AulasService } from '../service/aulas.service';


@Component({
  selector: 'app-aulas-form',
  templateUrl: './aulas-form.component.html',
  styleUrls: ['./aulas-form.component.scss']
})
export class AulasFormComponent implements OnInit {
  formAula!: FormGroup
  submitted: boolean = false;
  title: string = 'Adição de aula'
  materias: Materia[] = []

  constructor(
    private fb: FormBuilder,
    private materiaService: MateriasService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private aulaService: AulasService,
  ) { }

  ngOnInit(): void {
    const aula = this.route.snapshot.data['aula'];


    this.formAula = this.fb.group({
      id: [aula.id],
      nome: [aula.nome, [Validators.required]],
      youtubeUrl: [aula.youtubeUrl, [Validators.required]],
      materia_id: [aula.materia_id, [Validators.required]],
      atividades: this.fb.array([])
    });

    if (aula) {
      const atividadesFormArray = this.formAula.get('atividades') as FormArray;

  if (aula.Atividades && aula.Atividades.length > 0) {
    aula.Atividades.forEach((atividade: any) => {
      const atividadeGroup = this.fb.group({
        id: [atividade.id],
        pergunta: [atividade.pergunta, [Validators.required]],
        alternativas: this.fb.array([]),
      });

      if (atividade.Alternativas && atividade.Alternativas.length > 0) {
        atividade.Alternativas.forEach((alternativa: any) => {
          const alternativaGroup = this.fb.group({
            id: [alternativa.id],
            texto: [alternativa.texto, [Validators.required]],
            alternativaCorreta: [alternativa.alternativaCorreta, [Validators.required]],
          });

          (atividadeGroup.get('alternativas') as FormArray).push(alternativaGroup);
        });
      }

      atividadesFormArray.push(atividadeGroup);
    });
  }
}

    this.materiaService.list().subscribe(
      (materia) => {
        this.materias = materia;
      })
  }


  addAtividade() {
    const atividades = this.formAula.get('atividades') as FormArray;
  
    if (atividades.length < 20) { // Verifica se ainda não atingiu o limite de 20
      const novaAtividade = this.fb.group({
        id: [null],
        pergunta: [null, Validators.required],
        alternativas: this.fb.array([])
      });

      atividades.push(novaAtividade);
    } else {
      this.alertService.showAlertDanger('Você atingiu o limite de 20 atividades por aula');
    }
  }
  

  addAlternativa(atividadeIndex: number) {
    const alternativas = this.formAula.get(`atividades.${atividadeIndex}.alternativas`) as FormArray;
  
    if (alternativas.length < 6) { // Verifica se ainda não atingiu o limite de 6
      alternativas.push(this.fb.group({
        id: [null],
        texto: [null, Validators.required],
        alternativaCorreta: [false]
      }));
    } else {
      this.alertService.showAlertDanger('Você atingiu o limite de 6 alternativas por atividade');
    }
  }
  
  

  getAtividadesFormArray() {
    return (this.formAula.get('atividades') as FormArray)?.controls;
  }

  getAlternativasFormArray(atividadeIndex: number) {
    const atividades = this.formAula.get('atividades') as FormArray;
    return (atividades.at(atividadeIndex).get('alternativas') as FormArray)?.controls;
  }

  removeAtividade(atividadeIndex: number, index: number) {
    const alternativas = (this.formAula.get(`atividades.${atividadeIndex}.alternativas`) as FormArray);
    alternativas.removeAt(index)
  }

  removeLesson(index: number) {
    const atividades = this.formAula.get('atividades') as FormArray
    atividades.removeAt(index)
  }


  hasError(field: string) {
    return this.formAula.get(field)?.errors;
  }



  onSubmit(): void {
    if (this.formAula.valid) {
      this.submitted = true;
      let msgSuccess = 'Aula criada com sucesso!';
      let msgError = 'Erro ao criar aula, tente novamente!';
      if (this.formAula.value.id) {
        msgSuccess = 'Aula atualizada com sucesso!';
        msgError = 'Erro ao atualizar aula, tente novamente!';
      }

      this.aulaService.save(this.formAula.value).subscribe(
        () => {
          this.alertService.showAlertSuccess(msgSuccess)
          this.router.navigate(['aulas']);
          this.formAula.reset();
        },
        (error: any) => {
          this.alertService.showAlertSuccess(msgError)
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.formAula.reset();
    this.router.navigate(['aulas']);
  }
}
