import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesGuard } from './login/guards/roles.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'aluno',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ RolesGuard],
    // canLoad: [AuthGuard],
    data: { testes: [ 'acd71245-1591-45cf-abc8-c16a623d9503'] }
  },
  {
    path: 'perfil',
    loadChildren: () => import('./user-profile/user-profile.module').then((m) => m.UserProfileModule),
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard]
  },
  {
    path: 'aluno',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard]
  },
  {
    path: 'docentes',
    loadChildren: () => import('./docente/docente.module').then((m) => m.DocenteModule),
    canActivate: [AuthGuard, RolesGuard],
    canLoad: [AuthGuard],
    data: { testes: [ 'acd71245-1591-45cf-abc8-c16a623d9503'] }

  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then((m) => m.CursosModule),
    canActivate: [AuthGuard, RolesGuard],
    canLoad: [AuthGuard],
    data: { testes: [ 'acd71245-1591-45cf-abc8-c16a623d9503'] }

  },
  {
    path: 'aulas',
    loadChildren: () => import('./aulas/aulas.module').then((m) => m.AulasModule),
    // canActivate: [AuthGuard, RolesGuard],
    // canLoad: [AuthGuard],
    data: { testes: [ 'acd71245-1591-45cf-abc8-c16a623d9503'] }

  },
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then((m) => m.AlunosModule),
    canActivate: [AuthGuard, RolesGuard],
    canLoad: [AuthGuard],
    data: { testes: [ 'acd71245-1591-45cf-abc8-c16a623d9503'] }

  },
  {
    path: 'materias',
    loadChildren: () => import('./materias/materias.module').then((m) => m.MateriasModule),
    canActivate: [AuthGuard, RolesGuard],
    canLoad: [AuthGuard],
    data: { testes: [ 'acd71245-1591-45cf-abc8-c16a623d9503'] }

  },
  {
    path: 'rxjs-poc',
    loadChildren: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then((m) => m.UnsubscribeRxjsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then((m) => m.UploadFileModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'busca-reativa',
    loadChildren: () => import('./reactive-search/reactive-search.module').then((m) => m.ReactiveSearchModule),
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
export class AppRoutingModule { }
