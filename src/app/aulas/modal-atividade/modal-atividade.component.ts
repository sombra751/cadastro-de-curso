import { AulasService } from './../service/aulas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-modal-atividade',
  templateUrl: './modal-atividade.component.html',
  styleUrls: ['./modal-atividade.component.scss']
})
export class ModalAtividadeComponent implements OnInit {
  formAtividade!: FormGroup
  submitted = false

  constructor(public dialogRef: MatDialogRef<ModalAtividadeComponent>, private fb: FormBuilder,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private aulasService: AulasService,
    ) { }

  ngOnInit(): void {
    this.formAtividade = this.fb.group({
      id: [''],
      pergunta: ['', [Validators.required]],
    })
  }
  hasError(field: string) {
    return this.formAtividade.get(field)?.errors;
  }

  onSubmit(): void {
    if (this.formAtividade.valid) {
      this.submitted = true;
      let msgSuccess = 'Matéria criada com sucesso!';
      let msgError = 'Erro ao criar matéria, tente novamente!';
      if (this.formAtividade.value.id) {
        msgSuccess = 'Matéria atualizada com sucesso!';
        msgError = 'Erro ao atualizar matéria, tente novamente!';
      }

      this.aulasService.postAtividades(this.formAtividade.value).subscribe(
        () => {
          this.alertService.showAlertSuccess(msgSuccess)
          this.router.navigate(['alternativas']);
          this.formAtividade.reset();
        },
        (error: any) => {
          this.alertService.showAlertSuccess(msgError)
        }
      );
    }
  }

}
