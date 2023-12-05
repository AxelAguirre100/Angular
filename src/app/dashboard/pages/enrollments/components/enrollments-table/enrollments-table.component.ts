import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollments } from '../../models';
import {
  selectEnrollments,
  selectEnrollmentsIsLoading,
} from '../../store/enrollment.selectors';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.scss'],
})
export class EnrollmentsTableComponent {
  displayedColumns = ['id', 'course', 'user',];

  enrollments$: Observable<Enrollments[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading);
  
    this.enrollments$.subscribe(data => console.log('Enrollments Data:', data));
  }
}