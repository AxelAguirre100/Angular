import { Component, Input, OnInit } from '@angular/core';
import { Enrollments } from '../../models';
import { EnrollmentsService } from '../../enrollments.service';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.scss']
})
export class EnrollmentsTableComponent implements OnInit {
  @Input()
  dataSource: Enrollments[] = [];

  constructor(private enrollmentsService: EnrollmentsService) {}
  displayedColumns = ['id', 'name', 'subscriptionTo', 'actions'];
  ngOnInit() {

  }
}
