import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../users/models';
import { Course } from '../../../courses/models';
import { EnrollmentsService } from '../../enrollments.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss']
})
export class EnrollmentDialogComponent implements OnInit {
  enrollmentExists: boolean = false;
  enrollmentForm: FormGroup;
  users: User[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private enrollmentsService: EnrollmentsService
  ) {
    this.enrollmentForm = this.fb.group({
      userId: [null, Validators.required],
      courseId: [null, Validators.required],
      enrollmentExists: [false]
    });
  }

  ngOnInit(): void {
    this.enrollmentsService.getUsers$().subscribe(users => {
      this.users = users;
    });

    this.enrollmentsService.getCourses$().subscribe(courses => {
      this.courses = courses;
    });
  }
  
  formSubmitted: boolean = false;
  enrollUser(): void {
    if (this.enrollmentForm && this.enrollmentForm.valid) {
      this.formSubmitted = true;
      this.enrollmentForm.markAsTouched();
      const enrollmentData = this.enrollmentForm.value;
      this.enrollmentsService.getEnrollments$().subscribe(enrollments => {
        const existingEnrollment = enrollments.find(enrollment => {
          return enrollment.userName === `${this.users.find(user => user.id === enrollmentData.userId)?.name} ${this.users.find(user => user.id === enrollmentData.userId)?.lastName}`
            && enrollment.subscriptionTo === this.courses.find(course => course.id === enrollmentData.courseId)?.name;
        });
  
        if (existingEnrollment) {
          this.enrollmentForm.setErrors({ enrollmentExists: true });
          console.log('User is already enrolled in this course.');
        } else {
          this.dialogRef.close(enrollmentData);
          console.log('Enrollment successful.');
        }
      });
    }
  }
}
