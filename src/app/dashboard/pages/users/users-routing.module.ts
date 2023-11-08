import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UsersDialogComponent } from "./components/users-dialog/users-dialog.component";

const routes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'detail/:id',
        component: UsersDialogComponent
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
export class UsersRoutingModule { }