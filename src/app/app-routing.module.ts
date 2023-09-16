import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then((m) => m.CursosModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'alunos',
    loadChildren: () => import ('./alunos/alunos.module').then((m) => m.AlunosModule),
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard]
  },
  {
    path: 'materias',
    loadChildren: () => import ('./materias/materias.module').then((m) => m.MateriasModule),
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard]
  },
  {
    path: 'rxjs-poc',
    loadChildren: () => import ('./unsubscribe-rxjs/unsubscribe-rxjs.module').then((m) => m.UnsubscribeRxjsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'upload',
    loadChildren: () => import ('./upload-file/upload-file.module').then((m) => m.UploadFileModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'busca-reativa',
    loadChildren: () => import ('./reactive-search/reactive-search.module').then((m) => m.ReactiveSearchModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    // loadChildren:() => import('./login/login.module').then(m => m.LoginModule)
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
