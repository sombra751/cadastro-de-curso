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
import { Docente2Service } from '../service/docente2.service';
import { Docente } from '../docente';
import { DocenteService } from '../service/docente.service';


@Component({
  selector: 'app-docente-lista',
  templateUrl: './docente-lista.component.html',
  styleUrls: ['./docente-lista.component.scss']
})
export class DocenteListaComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any;

  // docente!: Observable<Docente[]>;
  error$ = new Subject<boolean>();
  deleteModalRef!: BsModalRef;

  displayedColumns = ['id', 'name', 'acoes'];
  dataSource!: MatTableDataSource<Docente>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialogRef!: MatDialogRef<any>;

  cursoSelecionado!: Docente;

  constructor(
    private docenteService: Docente2Service, 
    private docenteService1: DocenteService, 
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.docenteService.list()
    // .subscribe((dados: any) => this.docente = dados)
    this.onRefresh();
  }

  onRefresh() {
   this.docenteService.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    this.docenteService1
      .getDocentes()
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
      ' Erro ao carregar docente. Tente novamente mais tarde.'
    );
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: any): void {
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
          result ? this.docenteService.remove(curso.id) : EMPTY
        )
      )
      .subscribe(
        () => {
          this.alertService.showAlertSuccess('O curso foi removido')
          this.onRefresh();
        },
        (error: any) => {
          this.alertService.showAlertDanger('Erro ao remover curso');
        }
      );
  }

  onDeclineDelete() {}

  onConfirmDelete() {
    this.docenteService.remove(this.cursoSelecionado).subscribe(
      (success) => {
        this.onRefresh(), this.onDeclineDelete();
      },
      (error) => {
        this.alertService.showAlertDanger('erro ao remover curso'),
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
