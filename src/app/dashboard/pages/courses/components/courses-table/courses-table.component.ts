import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  @Input()
  dataSource: Course[] = []
  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'actions']

  @Output()
  editCourse = new EventEmitter();
  @Output()
  deleteCourse = new EventEmitter();
}
