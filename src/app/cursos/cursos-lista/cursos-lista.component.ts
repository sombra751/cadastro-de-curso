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
import { Curso } from '../cursos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Cursos2Service } from '../service/cursos2.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  // cursos!: Curso[]

  @ViewChild('deleteModal') deleteModal: any;

  // cursos!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  deleteModalRef!: BsModalRef;

  displayedColumns = ['id', 'name', 'duracao', 'acoes'];
  dataSource!: MatTableDataSource<Curso>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialogRef!: MatDialogRef<any>;

  cursoSelecionado!: Curso;

  constructor(
    private cursosService: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.cursosService.list()
    // .subscribe((dados: any) => this.cursos = dados)
    this.onRefresh();
  }

  onRefresh() {
   this.cursosService.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    this.cursosService
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
      ' Erro ao carregar cursos. Tente novamente mais tarde.'
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
          result ? this.cursosService.remove(curso.id) : EMPTY
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
    this.cursosService.remove(this.cursoSelecionado.id).subscribe(
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
