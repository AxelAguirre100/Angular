import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './users.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userName = '';
  users$: Observable<User[]> = new Observable<User[]>();
  filteredUsers$: Observable<User[]> = new Observable<User[]>();
  noUsersMessage = 'No hay usuarios mayores de 25 años.';
  isFilterActive = false;

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private matDialog: MatDialog, private usersService: UsersService) {
    this.users$ = this.usersSubject.asObservable();
    this.updateFilteredUsers();
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  openUsersDialog(): void {
    this.matDialog.open(UsersDialogComponent)
      .afterClosed()
      .subscribe((v) => {
        if (!!v) {
          const updatedUsers = this.usersSubject.value.concat({ ...v, id: Math.floor(Math.random() * 10000) });
          this.usersSubject.next(updatedUsers);
          this.updateFilteredUsers();
        }
      });
  }

  onEditUser(user: User): void {
    this.matDialog.open(UsersDialogComponent, {
      data: user,
    }).afterClosed().subscribe((v) => {
      if (!!v) {
        const updatedUsers = this.usersSubject.value.map(u => u.id === user.id ? { ...u, ...v } : u);
        this.usersSubject.next(updatedUsers);
        this.updateFilteredUsers();
      }
    });
  }

  onDeleteUser(userId: number): void {
    const updatedUsers = this.usersSubject.value.filter(user => user.id !== userId);
    this.usersSubject.next(updatedUsers);
    this.updateFilteredUsers();
  }

  filterUsersByAge(): void {
    this.isFilterActive = true;
    this.updateFilteredUsers();
  }

  resetFilter(): void {
    this.isFilterActive = false;
    this.updateFilteredUsers();
  }

  private updateFilteredUsers(): void {
    this.filteredUsers$ = this.users$.pipe(
      map(users => this.isFilterActive ? users.filter(user => user.age >= 25) : users)
    );
  }
}