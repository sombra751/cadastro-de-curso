import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CursosService } from 'src/app/cursos/service/cursos.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  @Input() title!: string;
  @Input() msg!: string;
  @Input() confirmTxt = 'confirmar';
  @Input() cancelTxt = 'cancelar';

  confirmResult!: Subject<boolean>;

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.title = data.title;
      this.msg = data.msg;
      this.confirmTxt = data.confirmTxt;
      this.cancelTxt = data.cancelTxt;
      this.confirmResult = data.confirmResult;
    }
  }

  ngOnInit(): void {
    
  }

  onClose() {
    this.confirmAndClose(false);
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  private confirmAndClose(result: boolean) {
    this.confirmResult.next(result);
    this.confirmResult.complete();
    this.dialogRef.close();
  }
}
