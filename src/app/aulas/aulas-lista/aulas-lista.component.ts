import { MatTableDataSource } from '@angular/material/table';
import { AulasService } from './../service/aulas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, switchMap, take } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Aulas } from '../aula';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-aulas-lista',
  templateUrl: './aulas-lista.component.html',
  styleUrls: ['./aulas-lista.component.scss']
})
export class AulasListaComponent implements OnInit {
 // materias!: Observable<Materia[]>
 aulaSelecionada!: Aulas

 displayedColumns = ['id', 'nome', 'acoes'];
 dataSource!: MatTableDataSource<Aulas>;

 @ViewChild(MatPaginator) paginator!: MatPaginator;

 constructor(
   private aulasService: AulasService, 
   private alertService: AlertModalService, 
   private router: Router, 
   private route: ActivatedRoute,
 ) { }

 ngOnInit(): void {
   // this.aulasService.list()
   // .subscribe((dados: any) => this.cursos = dados)
   this.onRefresh();
 }

 onRefresh() {
  this.aulasService.list().pipe(
     catchError((error) => {
       console.error(error);
       // this.error$.next(true);
       this.handleError();
       return EMPTY;
     })
   );

   this.aulasService
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
     ' Erro ao carregar aulas. Tente novamente mais tarde.'
   );
 }

 onEdit(id: any) {
   this.router.navigate(['editar', id], { relativeTo: this.route });
 }

 onDelete(aula  : any): void {
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
         result ? this.aulasService.remove(aula.id) : EMPTY
       )
     )
     .subscribe(
       () => {
         this.alertService.showAlertSuccess('O aula   foi removido')
         this.onRefresh();
       },
       (error: any) => {
         this.alertService.showAlertDanger('Erro ao remover aula');
       }
     );
 }

 onDeclineDelete() { }

 onConfirmDelete() {
   this.aulasService.remove(this.aulaSelecionada.id).subscribe(
     (success) => {
       this.onRefresh(), this.onDeclineDelete();
     },
     (error) => {
       this.alertService.showAlertDanger('erro ao remover aula'),
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


