import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map } from 'rxjs';
import { User } from 'src/app/dashboard/pages/users/models';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments.local';
import { LoginPayload } from '../models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  public authUser$: Observable<User | null> = this.store.select(selectAuthUser);

  private handleAuthUser(authUser: User): void {
    this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
    localStorage.setItem('token', authUser.token);
  }

  login(payload: LoginPayload): void {
    this.httpClient
      .get<User[]>(`${environments.baseUrl}/users?email=${payload.email}&password=${payload.password}`)
      .subscribe({
        next: (response) => {
          const authUser = response && response.length ? response[0] : null;

          if (!authUser) {
            alert('Usuario o contraseña inválidos');
          } else if (authUser.role === 'STUDENT') {
            alert('No tienes permiso para acceder');
          } else {
            this.handleAuthUser(authUser);
            this.router.navigate(['/dashboard/home']);
          }
        },
        error: (err) => {
          alert('Error de conexión');
        },
      });
  }

  verifyToken(): Observable<boolean>{
    return this.httpClient.get<User[]>(`${environments.baseUrl}/users?token=${localStorage.getItem('token')}`).pipe(
      map((users) =>{
        if (!users.length) {
          return false
        }else{
          const authUser = users[0]
          this.handleAuthUser(authUser)
          return true
        }
      })
    )
  }

  logout(): void{
    this.store.dispatch(AuthActions.resetState())
    localStorage.removeItem('token')
    this.router.navigate(['/auth/login'])
  }
}
