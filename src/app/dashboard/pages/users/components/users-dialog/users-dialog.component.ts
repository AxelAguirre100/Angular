import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';
@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
})
export class UsersDialogComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef <UsersDialogComponent>, @Inject(MAT_DIALOG_DATA) public user?: User,){
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[^0-9]*$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[^0-9]*$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });

    if (this.user) {
      this.userForm.patchValue(this.user)
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid){
      this.userForm.markAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
    
  }
}
