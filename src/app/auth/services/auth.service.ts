import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/dashboard/pages/users/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private _authUser$ = new BehaviorSubject<User | null>(null);

  public authUser$ = this._authUser$.asObservable();

  login(): Observable<User> {
    const user: User = {
      id: 5,
      email: 'email@prueba.com',
      lastName: 'Gomez',
      name: 'Walter',
      age: 25,
    }
    this._authUser$.next(user)
    return of<User>(user)
  }
}
