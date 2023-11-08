import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EnrollmentsComponent } from "./enrollments.component";

const routes: Routes = [
    {
        path: '',
        component: EnrollmentsComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class EnrollmentsRoutingModule { }