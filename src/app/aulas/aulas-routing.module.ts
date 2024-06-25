import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AulasFormComponent } from './aulas-form/aulas-form.component';
import { AulasResolverGuard } from './guards/aulas-resolver.guard';
import { AulasListaComponent } from './aulas-lista/aulas-lista.component';

const routes: Routes = [
  {
    path: '',
    component: AulasListaComponent
  },
  {
    path: 'novo', component: AulasFormComponent,
    resolve: {
      aula: AulasResolverGuard,
    },
  },
  {
    path: 'editar/:id', component: AulasFormComponent, resolve: {
      aula: AulasResolverGuard,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulasRoutingModule { }
