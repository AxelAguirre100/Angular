import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AsideComponent } from './aside/aside.component';
import { ContentComponent } from './content/content.component';
import { AlumnosComponent } from './componentes/alumnos/alumnos.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AsideComponent,
    ContentComponent,
    AlumnosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
