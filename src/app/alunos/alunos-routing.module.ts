import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunosListaComponent } from './alunos-lista/alunos-lista.component';
import { AlunoResolverGuard } from './guards/aluno-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: AlunosListaComponent
  },
  {
    path: 'novo', component: AlunosFormComponent, resolve: {
      aluno: AlunoResolverGuard,
    },
  },
  {
    path: 'editar/:id', component: AlunosFormComponent, resolve: {
      aluno: AlunoResolverGuard,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
