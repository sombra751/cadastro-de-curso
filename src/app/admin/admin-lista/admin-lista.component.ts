import {
  Observable,
  catchError,
  of,
  Subject,
  take,
  switchMap,
  EMPTY,
} from 'rxjs';
import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Admin2Service } from '../service/admin2.service';
import { Admin } from '../admin';


@Component({
  selector: 'app-admin-lista',
  templateUrl: './admin-lista.component.html',
  styleUrls: ['./admin-lista.component.scss']
})
export class AdminListaComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal: any;

  // admins!: Observable<Admin[]>;
  error$ = new Subject<boolean>();
  deleteModalRef!: BsModalRef;

  nmrIndividuos = 0

  displayedColumns = ['id', 'name', 'acoes'];
  dataSource!: MatTableDataSource<Admin>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialogRef!: MatDialogRef<any>;

  adminSelecionado!: Admin;

  constructor(
    private admin2Service: Admin2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.admin2Service.list()
    // .subscribe((dados: any) => this.admins = dados)
    this.onRefresh();
  }

  onRefresh() {
   this.admin2Service.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    this.admin2Service
      .list()
      .pipe(catchError((error) => EMPTY))
      .subscribe(
        (dados) => {
          this.dataSource = new MatTableDataSource(dados);
          this.dataSource.paginator = this.paginator;
        }
        //   error => console.error(error),
        //   () => console.log('observable completo')
      );
  }
  handleError() {
    this.alertService.showAlertDanger(
      ' Erro ao carregar admins. Tente novamente mais tarde.'
    );
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(admin: any): void {
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja excluir este item?',
      'Confirmar',
      'Cancelar'
    );

    result$
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.admin2Service.remove(admin.id) : EMPTY
        )
      )
      .subscribe(
        () => {
          this.alertService.showAlertSuccess('O admin foi removido')
          this.onRefresh();
        },
        (error: any) => {
          this.alertService.showAlertDanger('Erro ao remover admin');
        }
      );
  }

  onDeclineDelete() {}

  onConfirmDelete() {
    this.admin2Service.remove(this.adminSelecionado).subscribe(
      (success) => {
        this.onRefresh(), this.onDeclineDelete();
      },
      (error) => {
        this.alertService.showAlertDanger('erro ao remover admin'),
          this.onDeclineDelete();
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
