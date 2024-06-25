import { EMPTY, Observable, catchError, switchMap, take } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Materia } from '../materias';
import { ActivatedRoute, Router } from '@angular/router';
import { Materias2Service } from '../service/materias2.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-materias-lista',
  templateUrl: './materias-lista.component.html',
  styleUrls: ['./materias-lista.component.scss']
})
export class MateriasListaComponent implements OnInit {
  // materias!: Observable<Materia[]>
  materiaSelecionado!: Materia

  displayedColumns = ['id', 'name',  'cursos', 'acoes'];
  dataSource!: MatTableDataSource<Materia>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private materiasService: Materias2Service, 
    private alertService: AlertModalService, 
    private router: Router, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.materiasService.list()
    // .subscribe((dados: any) => this.cursos = dados)
    this.onRefresh();
  }

  onRefresh() {
   this.materiasService.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    this.materiasService
      .list()
      .pipe(catchError((error) => EMPTY))
      .subscribe(
        (dados) => {
          console.log(dados);
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
          result ? this.materiasService.remove(curso.id) : EMPTY
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

  onDeclineDelete() { }

  onConfirmDelete() {
    this.materiasService.remove(this.materiaSelecionado.id).subscribe(
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
