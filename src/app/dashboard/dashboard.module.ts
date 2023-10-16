import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsersModule } from './pages/users/users.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FontSizeDirective } from './font.directive.spec';
@NgModule({
  declarations: [
    DashboardComponent,
    FontSizeDirective
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    UsersModule,
    SharedModule,
    MatToolbarModule,
  ],
  exports:[DashboardComponent],
})
export class DashboardModule { }