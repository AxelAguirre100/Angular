import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map } from 'rxjs';
import { User } from 'src/app/dashboard/pages/users/models';
import { HttpClient } from '@angular/common/http'
import { environments } from 'src/environments/environments.local';
import { LoginPayload } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  private _authUser$ = new BehaviorSubject<User | null>(null);

  public authUser$ = this._authUser$.asObservable();

  login(payload: LoginPayload): void {

   this.httpClient.get<User[]>(`${environments.baseUrl}/users?email=${payload.email}&password=${payload.password}`).subscribe({
    next: (response) => {
      if (!response.length) {
        alert('usuario o contraseña invalidos')
      } else {
        const authUser = response[0]
        this._authUser$.next(authUser)
        localStorage.setItem('token', authUser.token)
        this.router.navigate(['/dashboard/home'])
        console.log(response)
        console.log('ok')
      }
    },
   })
  }

  verifyToken(): Observable<boolean>{
    return this.httpClient.get<User[]>(`${environments.baseUrl}/users?token=${localStorage.getItem('token')}`).pipe(
      map((users) =>{
        if (!users.length) {
          return false
        }else{
          const authUser = users[0]
          this._authUser$.next(authUser)
          localStorage.setItem('token', authUser.token)
          return true
        }
      })
    )
  }

  logout(): void{
    this._authUser$.next(null);
    localStorage.removeItem('token')
    this.router.navigate(['/auth/login'])
  }
}
