import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriasListaComponent } from './materias-lista/materias-lista.component';
import { MateriasFormComponent } from './materias-form/materias-form.component';
import { MateriasComponent } from './materias/materias.component';
import { MateriaResolverGuard } from './guards/materia-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: MateriasListaComponent
  },
  {
    path: 'novo', component: MateriasFormComponent,
    resolve: {
      materia: MateriaResolverGuard,
    },
  },
  {
    path: 'editar/:id', component: MateriasFormComponent, resolve: {
      materia: MateriaResolverGuard,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasRoutingModule { }
