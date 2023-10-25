import { Injectable } from '@angular/core';
import { User } from './models';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor() {}

  getUsers(): Observable<User[]> {
    return of([
      {
        id: 1,
        name: 'Walter',
        lastName: 'Gomez',
        email: 'waltergomez@gmail.com',
        age: 19,
      },
      {
        id: 2,
        name: 'Rodrigo',
        lastName: 'Lopez',
        email: 'rodrigo@gmail.com',
        age: 26,
      },
      {
        id: 3,
        name: 'aaa',
        lastName: 'aaa',
        email: 'rodrigo@gmail.com',
        age: 26,
      },
    ]);
  }
}