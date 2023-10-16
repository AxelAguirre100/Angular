import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FullnamePipe } from './pipes/fullname.pipe'
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    FullnamePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[MatIconModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, FullnamePipe, MatTableModule]
})
export class SharedModule { }