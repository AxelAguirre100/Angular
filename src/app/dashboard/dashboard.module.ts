import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsersModule } from './pages/users/users.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FontSizeDirective } from './font.directive.spec';
import { HomeModule } from './pages/home/home.module';
import {MatListModule} from '@angular/material/list'
import { RouterModule } from '@angular/router';
import { CoursesModule } from './pages/courses/courses.module';
import { EnrollmentsModule } from './pages/enrollments/enrollments.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
@NgModule({
  declarations: [
    DashboardComponent,
    FontSizeDirective
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    SharedModule,
    MatToolbarModule,
    HomeModule,
    MatListModule,
    DashboardRoutingModule,
  ],
  exports:[DashboardComponent],
})
export class DashboardModule { }
