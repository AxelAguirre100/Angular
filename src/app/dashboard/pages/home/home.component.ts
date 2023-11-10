import { Component } from '@angular/core';
import { User } from '../users/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {
    const getUsersPromise = new Promise((resolve, reject) => {
      const users: User[] = [
        {
          id: 1,
          name: 'asd',
          email: 'asd@asd.com',
          lastName: 'a',
          age: 25,
          token: "asdasd",
          role: "ADMIN"
        },
      ]
      setTimeout(() => {
        resolve(users)
      }, 5000);
    })
    getUsersPromise.then((result) => console.log(result))
  }
}
