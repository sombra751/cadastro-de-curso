import { EMPTY, Observable, Subject, catchError, switchMap, take } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Aluno } from '../alunos';
import { Alunos2Service } from '../service/alunos2.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-alunos-lista',
  templateUrl: './alunos-lista.component.html',
  styleUrls: ['./alunos-lista.component.scss']
})
export class AlunosListaComponent implements OnInit {
  // alunos!: Observable<Aluno[] | any>
  AlunoSelecionado!: Aluno;
  error$ = new Subject<boolean>();

  displayedColumns = ['id', 'name', 'cursos', 'acoes'];
  dataSource!: MatTableDataSource<Aluno>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private alunosService: Alunos2Service, 
    private alertService: AlertModalService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.alunosService.list()
    // .subscribe((dados: any) => this.cursos = dados)
    this.onRefresh();
  }

  onRefresh() {
    this.alunosService.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    this.alunosService
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
          result ? this.alunosService.remove(curso.id) : EMPTY
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
    this.alunosService.remove(this.AlunoSelecionado.id).subscribe(
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
