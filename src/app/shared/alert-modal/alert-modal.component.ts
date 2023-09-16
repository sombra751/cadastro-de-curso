import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from '../alert-modal.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() type = 'success';
  @Input() message!: string;

  constructor(public dialogRef: MatDialogRef<AlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertModalService: AlertModalService
  ) {
    if (data) {
      this.type = data.type;
      this.message = data.message;
    }
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

}
