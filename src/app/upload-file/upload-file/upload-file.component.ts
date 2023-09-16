import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  files!: Set<File>;
  progress = 0;

  constructor(private uploadFileService: UploadFileService, private alertModalService: AlertModalService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService
        .upload(this.files, '/api/upload')
        .pipe(
          uploadProgress((progress) => {
            console.log(this.progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe((response) => {
          this.alertModalService.showAlertSuccess('Upload concluído')
        });
      // .subscribe((event: HttpEvent<object>) => {
      //   // HttpEventType:
      //   // console.log(event);
      //   if (event.type === HttpEventType.Response) {
      //     console.log('Upload concluído');
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //     let percentDone = 0;
      //     if (event && event.total) {
      //       percentDone = Math.round((event.loaded * 100) / event.total);
      //       // console.log(percentDone)
      //       this.progress = percentDone
      //     }
      //   }
      // });
    }
  }

  onDownloadExcel() {
    this.uploadFileService
      .download('/api/downloadExcel')
      .subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'report.xlsx')
      });
  }

  onDownloadPdf() {
    this.uploadFileService
      .download('/api/downloadPdf')
      .subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'report.pdf')
      });
  }
}
