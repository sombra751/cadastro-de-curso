import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteListaComponent } from './docente-lista/docente-lista.component';
import { DocenteFormComponent } from './docente-form/docente-form.component';
import { DocenteResolverGuard } from './guards/docente-resolver.guard';

const routes: Routes = [
  { path: '', component: DocenteListaComponent },
  {
    path: 'novo',
    component: DocenteFormComponent,
    resolve: {
      docente: DocenteResolverGuard,
    },
  },
  {
    path: 'editar/:id',
    component: DocenteFormComponent,
    resolve: {
      docente: DocenteResolverGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteRoutingModule { }
