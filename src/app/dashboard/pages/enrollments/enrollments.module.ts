import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentsTableComponent } from './components/enrollments-table/enrollments-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';

@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentsTableComponent,
    EnrollmentDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EnrollmentsModule { }
