import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { ViewResultComponent } from './admin/view-result/view-result.component';
import { InstructionsComponent } from './instructions/instructions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'user-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quiz/:name',
    component: QuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'result/:name',
    component: ResultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewresults',
    component: ViewResultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'instructions/:name',
    component: InstructionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
