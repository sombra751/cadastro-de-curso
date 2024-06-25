import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AulasService } from '../service/aulas.service';

@Component({
  selector: 'app-modal-alternativa',
  templateUrl: './modal-alternativa.component.html',
  styleUrls: ['./modal-alternativa.component.scss']
})
export class ModalAlternativaComponent implements OnInit {
  formAlternativa!: FormGroup
  submitted = false

  constructor(public dialogRef: MatDialogRef<ModalAlternativaComponent>, private fb: FormBuilder,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private aulasService: AulasService,
    ) { }

  ngOnInit(): void {
    this.formAlternativa = this.fb.group({
      id: [''],
      texto: ['', [Validators.required]],
      alternativaCorreta: ['', [Validators.required]]
    })
  }
  hasError(field: string) {
    return this.formAlternativa.get(field)?.errors;
  }

  onSubmit(): void {
    if (this.formAlternativa.valid) {
      this.submitted = true;
      let msgSuccess = 'Matéria criada com sucesso!';
      let msgError = 'Erro ao criar matéria, tente novamente!';
      if (this.formAlternativa.value.id) {
        msgSuccess = 'Matéria atualizada com sucesso!';
        msgError = 'Erro ao atualizar matéria, tente novamente!';
      }

      this.aulasService.postAlternativas(this.formAlternativa.value).subscribe(
        () => {
          this.alertService.showAlertSuccess(msgSuccess)
          this.router.navigate(['alternativas']);
          this.formAlternativa.reset();
        },
        (error: any) => {
          this.alertService.showAlertSuccess(msgError)
        }
      );
    }
  }
}
