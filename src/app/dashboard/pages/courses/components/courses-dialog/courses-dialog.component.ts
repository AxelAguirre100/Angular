import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl  } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { CoursesServices } from '../../courses.service';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss']
})
export class CoursesDialogComponent {

  nameControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$')
  ]);
  startDateControl = new FormControl();
  endDateControl = new FormControl();
  courseForm = new FormGroup({
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
  })

  constructor(
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    private coursesServices: CoursesServices,
    @Inject(MAT_DIALOG_DATA) private courseId?: number
  ) {
    if (courseId) {
      this.coursesServices.getCourseById$(courseId).subscribe({
        next: (c) => {
          if (c) {
            this.courseForm.patchValue(c);
          }
        },
      });
    }
  }

  public get isEditing(): boolean {
    return !!this.courseId;
  }
  onSubmit(): void {
    if (this.courseForm.invalid) {
      return this.courseForm.markAllAsTouched();
    } else{
      this.matDialogRef.close(this.courseForm.value)
    }
  }
}
