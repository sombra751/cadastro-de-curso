import { MateriasService } from './../service/materias.service';
import { Materia } from './../materias';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/cursos/cursos';
import { Materias2Service } from '../service/materias2.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


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
      youtubeUrl:[materia.youtubeUrl],
      curso: [materia.curso,[Validators.required]],
    });

    this.materiaService1.getTodosCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });

    
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit(): void {

    if (this.form.valid) {
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
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['materias']);
  }
}