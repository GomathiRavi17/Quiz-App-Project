import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FilterPipe } from '../shared/filter.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminRoutingModule } from './admin-routing.module';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { FormsModule } from '@angular/forms';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { EditResultComponent } from './edit-result/edit-result.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddquestionComponent,
    FilterPipe,
    ViewQuestionComponent,
    ViewResultComponent,
    EditResultComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    RouterModule
  ]
})
export class AdminModule { }
