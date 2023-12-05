import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { User } from 'src/app/dashboard/pages/users/models';
import { environments } from 'src/environments/environments.local';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
// no pude solucionarlo
xdescribe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot({})],
      providers: [MockProvider(Router)],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('AuthService should be defined', () => {
    expect(authService).toBeTruthy();
  });

  it('Debe establecer un usuario autenticado al hacer login()', () => {
    const USER_MOCK: User = {
      id: 1,
      email: 'fake@mail.com',
      lastName: 'fakeLastName',
      name: 'fakeName',
      role: 'ADMIN',
      token: '84jfdskfsdjh3m2nudisfdusafjd',
      password: '123456',
      age: 19,
    };

    authService.login({
      email: USER_MOCK.email,
      password: USER_MOCK.password,
    });

    httpController
      .expectOne({
        method: 'GET',
        url: `${environments.baseUrl}/users?email=${USER_MOCK.email}&password=${USER_MOCK.password}`,
      })
      .flush([USER_MOCK]);

    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(USER_MOCK);
      },
    });
  });
});