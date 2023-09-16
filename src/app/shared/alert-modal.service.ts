import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';


export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  constructor(private modalService: BsModalService, public dialog: MatDialog) {}

  private showAlert(message: any, type: AlertTypes, dismissTimeout?: number) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: 'auto',
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'my-custom-dialog',

    data: {
      type: type,
      message: message,
    },
  });
  if (dismissTimeout) {
    setTimeout(() => this.dialog.closeAll(), dismissTimeout);
  }
}

  showAlertDanger(message: any) {
    this.showAlert(message, AlertTypes.DANGER, 1000);
  }

  showAlertSuccess(message: any) {
    this.showAlert(message, AlertTypes.SUCCESS, 1000);
  }

  showConfirm(
    title: string,
    msg: string,
    confirmTxt?: string,
    cancelTxt?: string
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '250px',
      autoFocus: false,
      restoreFocus: false,
      data: {
        title: title,
        msg: msg,
        confirmTxt: confirmTxt,
        cancelTxt: cancelTxt,
        confirmResult: new Subject<boolean>(),
      },
    });

    return dialogRef.componentInstance.confirmResult.asObservable();
  }
}
