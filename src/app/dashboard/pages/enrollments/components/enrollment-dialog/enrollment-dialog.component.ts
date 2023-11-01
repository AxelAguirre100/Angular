import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../users/models';
import { Course } from '../../../courses/models';
import { EnrollmentsService } from '../../enrollments.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { Enrollments } from '../../models';
import { of } from 'rxjs';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss']
})
export class EnrollmentDialogComponent {
  enrollmentForm: FormGroup;
  users: User[];
  courses: Course[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private enrollmentsService: EnrollmentsService) {
    this.enrollmentForm = this.fb.group({
      userId: ['', Validators.required],
      courseId: ['', Validators.required],
    });

    this.users = data.users;
    this.courses = data.courses;
  }

  enrollUser() {
    const userId = this.enrollmentForm.get('userId')?.value;
    const courseId = this.enrollmentForm.get('courseId')?.value;
    console.log(this.enrollmentForm.value);
    console.log(userId);
    console.log(courseId);
    if (userId !== null && courseId !== null) {
      this.enrollmentsService.createEnrollment(this.enrollmentForm).subscribe(enrollments => {
        // El enrollment se ha creado correctamente
        console.log('Enrollment creado:', enrollments);
      });
    }
  }
}