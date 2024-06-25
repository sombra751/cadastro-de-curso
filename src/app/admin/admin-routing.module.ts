import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListaComponent } from './admin-lista/admin-lista.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminResolverGuard } from './guards/admin-resolver.guard';

const routes: Routes = [
  { path: '', component: AdminListaComponent },
  {
    path: 'novo',
    component: AdminFormComponent,
    resolve: {
      admin: AdminResolverGuard,
    },
  },
  {
    path: 'editar/:id',
    component: AdminFormComponent,
    resolve: {
      admin: AdminResolverGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
