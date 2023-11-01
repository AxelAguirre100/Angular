import { Component, OnInit } from '@angular/core';
import { EnrollmentsService } from './enrollments.service';
import { Observable, of } from 'rxjs';
import { Enrollments } from './models';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { User } from '../users/models';
import { Course } from '../courses/models';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  enrollments$: Observable<Enrollments[]>;
  users: User[] = [];
  courses: Course[] = [];

  constructor(private EnrollmentsService: EnrollmentsService, private dialog: MatDialog) {
    this.enrollments$ = this.EnrollmentsService.getEnrollments$();
  }

  ngOnInit() {
    this.EnrollmentsService.getUsers$().subscribe(users => this.users = users);
    this.EnrollmentsService.getCourses$().subscribe(courses => this.courses = courses);
  }

  openEnrollmentModal(): void {
    const dialogRef = this.dialog.open(EnrollmentDialogComponent, {
      width: '400px',
      data: { users: this.users, courses: this.courses },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }
}