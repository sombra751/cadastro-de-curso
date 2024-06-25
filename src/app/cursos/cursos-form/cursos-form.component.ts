import { CursosService } from './../service/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from './../cursos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos2Service } from '../service/cursos2.service';
import { catchError, finalize, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  title: string = 'Adição de curso'
docentes: any[] = []

  constructor(
    private fb: FormBuilder,
    private cursosService: Cursos2Service,
    private cursosService1: CursosService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.title = 'Edição de curso'
    }

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(35),
        ],
      ],
      descricao: [curso.descricao, [Validators.required]],
      docente_id: [curso.docente_id, [Validators.required]],
      duracao: [curso.duracao, [Validators.required]],
    });

    this.cursosService1.getdocentes().subscribe(
      (dados) => {
        this.docentes = dados;
      },
      (error) => {
        this.alertService.showAlertDanger(error);
      }
    );
  }


  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente!';
      }

      this.cursosService.save(this.form.value).subscribe(
        () => {
          this.alertService.showAlertSuccess(msgSuccess)
          this.router.navigate(['cursos']);
          this.form.reset();
        },
        (error: any) => {
          this.alertService.showAlertDanger(msgError);
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['cursos']);
  }
}
