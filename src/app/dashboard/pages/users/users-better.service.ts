import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersBetterService {

  constructor(private usersService: UsersService) { }

  getUsersWithProduct(): any {
    const users = this.usersService.getUsers()
    const products = [
      {
        id: 1,
        name: 'TV',
      },
    ]
    return {
      users,
      products,
    } 
  }
}
