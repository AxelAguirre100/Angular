import { Injectable } from '@angular/core';
import { User } from './models';
@Injectable({
  providedIn: 'root'
})
export class MockUsersService {

  constructor() { }

  getUsers(): User[] {
    return [
      {
        id: 1,
        name: 'Walteraa',
        lastName: 'Gomez',
        email: 'waltergomez@gmail.com',
        age: 19,
        token: "asdasd",
        role: "ADMIN",
        password: "123456"
      },
      {
        id: 2,
        name: 'Rodrigoaa',
        lastName: 'Lopez',
        email: 'rodrigo@gmail.com',
        age:20,
        token: "asdasd",
        role: "ADMIN",
        password: "123456"
      },
    ]
  }
}
