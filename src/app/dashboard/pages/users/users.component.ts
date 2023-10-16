import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userName = ''

  users: User[] = [
    {
      id: 1,
      name: 'Walter',
      lastName: 'Gomez',
      email: 'waltergomez@gmail.com'
    },
    {
      id: 2,
      name: 'Rodrigo',
      lastName: 'Lopez',
      email: 'rodrigo@gmail.com'
    }
  ]

  constructor(private matDialog: MatDialog) {}
  openUsersDialog(): void {
    this.matDialog.open(UsersDialogComponent)
    .afterClosed()
    .subscribe({
      next: (v) => {
        if (!!v) {
          this.users = [
            ...this.users,
            {
              ...v,
              id: Math.floor(Math.random() * 10000), // Genera un ID aleatorio entre 0 y 9999
            },
          ];
        }
      }
    });
  }

  onEditUser(user: User): void {
    this.matDialog.open(UsersDialogComponent, {
      data: user,
    }).afterClosed().subscribe({
      next: (v) =>{
        if (!!v) {
          const arrayUsuarios = [...this.users]
          const editadoArrayUsuarios = arrayUsuarios.findIndex((u) => u.id === user.id)
          arrayUsuarios[editadoArrayUsuarios] = { ...arrayUsuarios[editadoArrayUsuarios], ...v}
          this.users = [...arrayUsuarios,]
        }
      }
    })
  }

  onDeleteUser(userId: number): void {
    this.users = this.users.filter((u) => u.id !== userId)
  }
}
