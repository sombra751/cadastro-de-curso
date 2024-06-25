import { MateriasService } from './../service/materias.service';
import { Materia } from './../materias';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/cursos/cursos';
import { Materias2Service } from '../service/materias2.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-materias-form',
  templateUrl: './materias-form.component.html',
  styleUrls: ['./materias-form.component.scss']
})
export class MateriasFormComponent implements OnInit {
  form!: FormGroup
  submitted: boolean = false;
  title: string = 'Adição de materia'
  cursos: Curso[] = [];
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  


  constructor(private fb: FormBuilder,
    private materiaService1: MateriasService,
    private materiasService: Materias2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }
  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.title = 'Edição de matéria'
    }

    const materia = this.route.snapshot.data['materia'];

    this.form = this.fb.group({
      id: [materia.id],
      nome: [
        materia.nome,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(35),
        ],
      ],
      youtubeUrl: [materia.youtubeUrl],
      curso: [materia.curso, [Validators.required]],
      lessons: this.fb.array([])
    });

    if (materia) {
      this.form.patchValue({
        id: materia.id,
        nome: materia.nome,
        youtubeUrl: materia.youtubeUrl, // Substitua pelo valor correto
        curso: materia.curso // Substitua pelo valor correto
      });

      const lessonsFormArray = this.form.get('lessons') as FormArray;

      materia.lessons.forEach((lesson: any) => {
        const lessonGroup = this.fb.group({
          id: [lesson.id],
          pergunta: [lesson.pergunta, [Validators.required]],
          alternativaCorreta: [lesson.alternativaCorreta, [Validators.required]], // Substitua pelo valor correto
          alternativas: this.fb.array([])
        });

        lesson.alternativas.forEach((alternativa: any) => {
          const alternativaGroup = this.fb.group({
            id: [alternativa.id],
            texto: [alternativa.texto, [Validators.required]]
          });

          (lessonGroup.get('alternativas') as FormArray).push(alternativaGroup);
        });

        lessonsFormArray.push(lessonGroup);
      });
    }

    this.materiaService1.getTodosCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });


    console.log(materia)
  }

  addLesson() {
    const lessons = this.form.get('lessons') as FormArray;
  
    if (lessons.length < 20) { // Verifica se ainda não atingiu o limite de 10
      lessons.push(this.fb.group({
        id: [''],
        pergunta: [''],
        alternativaCorreta: [''],
        alternativas: this.fb.array([])
      }));
  
      this.accordion.openAll();
    } else {
      this.alertService.showAlertDanger('Você atingiu o limite de 10 lições');
    }
  }
  

  addAlternativa(lessonIndex: number) {
    const alternativas = this.form.get(`lessons.${lessonIndex}.alternativas`) as FormArray;
  
    if (alternativas.length < 6) { // Verifica se ainda não atingiu o limite de 5
      alternativas.push(this.fb.group({
        id: '',
        texto: ''
      }));
    } else {
      this.alertService.showAlertDanger('Você atingiu o limite de 6 alternativas')
    }
  }
  
  

  getLessonsFormArray() {
    return (this.form.get('lessons') as FormArray)?.controls;
  }

  getAlternativasFormArray(lessonIndex: number) {
    const lessons = this.form.get('lessons') as FormArray;
    return (lessons.at(lessonIndex).get('alternativas') as FormArray)?.controls;
  }

  removeAtividade(lessonIndex: number, index: number) {
    const alternativas = (this.form.get(`lessons.${lessonIndex}.alternativas`) as FormArray);
    alternativas.removeAt(index)
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as FormArray
    lessons.removeAt(index)
  }


  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit(): void {
    const lessons = this.form.get('lessons') as FormArray;
  
    const hasAtLeastOneLesson = lessons && lessons.length > 0;
    const hasAtLeastOneQuestion = lessons && lessons.controls.some((lesson: FormGroup | any) => lesson.get('pergunta')?.value);
    const hasAtLeastOneAlternative = lessons && lessons.controls.some((lesson: FormGroup | any) => {
      const alternativas = lesson.get('alternativas') as FormArray;
      return alternativas && alternativas.length > 0 && alternativas.controls.some((alternativa: FormGroup | any) => alternativa.get('texto')?.value);
    });
  
    if (hasAtLeastOneLesson && hasAtLeastOneQuestion && hasAtLeastOneAlternative && this.form.valid) {
      this.submitted = true;
      let msgSuccess = 'Matéria criada com sucesso!';
      let msgError = 'Erro ao criar matéria, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Matéria atualizada com sucesso!';
        msgError = 'Erro ao atualizar matéria, tente novamente!';
      }

      this.materiasService.save(this.form.value).subscribe(
        () => {
          this.alertService.showAlertSuccess(msgSuccess)
          this.router.navigate(['materias']);
          this.form.reset();
        },
        (error: any) => {
          this.alertService.showAlertSuccess(msgError)
        }
      );

    } else {
      this.alertService.showAlertDanger('Preencha todo o conteudo da atividade ou crie uma nova.');
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['materias']);
  }
}