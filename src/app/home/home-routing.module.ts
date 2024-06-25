import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeResolverGuard } from './guards/home-resolver.guard';
import { CursoIdComponent } from './curso-id/curso-id.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { MateriaIdComponent } from './materia-id/materia-id.component';
import { MateriaResolverGuard } from '../materias/guards/materia-resolver.guard';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    resolve:{
      curso: HomeResolverGuard
    } 
  }, 
  { path: 'materia/:id/questoes', component: QuestionarioComponent },
  {
    path: 'curso/:id',
    component: CursoIdComponent,
    resolve:{
      curso: HomeResolverGuard
    } 
  }, 
  {
    path: 'materia/:id',
    component: MateriaIdComponent,
    resolve: {
      materia: MateriaResolverGuard
    }
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
