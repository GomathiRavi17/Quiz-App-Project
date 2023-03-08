import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewQuestionComponent } from './view-question/view-question.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
   },
   {
    path: 'addquestion',
    component: AddquestionComponent
   },
   {
    path:'view-question/:selectedTeam',
    component:ViewQuestionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
