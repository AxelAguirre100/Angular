import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments.local';
import { CreateEnrollmentPayload, Enrollments } from '../models';
import { Course } from '../../courses/models';
import { User } from '../../users/models';

@Injectable()
export class EnrollmentEffects {
  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      // FILTRAR DE TODAS LAS ACCIONES, SOLO AQUELLAS QUE SEAN DE TIPO EnrollmentActions.loadEnrollments
      ofType(EnrollmentActions.loadEnrollments),

      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getEnrollments().pipe(
          // SI LA PETICION SALE BIEN, DISPARA LA ACCION EnrollmentActions.loadEnrollmentsSuccess
          map((data) => EnrollmentActions.loadEnrollmentsSuccess({ data })),

          // SI LA PETICION SALE MAL DISPARA LA ACCION EnrollmentActions.loadEnrollmentsFailure
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  loadEnrollmentDialogOptions$ = createEffect(() =>
    this.actions$.pipe(
      // FILTRO LAS ACCIONES loadEnrollmentDialogOptions
      ofType(EnrollmentActions.loadEnrollmentDialogOptions),
      concatMap(() =>
        this.getEnrollmentDialogOptions().pipe(
          map((resp) =>
            // SI SALE BIEN loadEnrollmentDialogOptionsSuccess
            EnrollmentActions.loadEnrollmentDialogOptionsSuccess(resp)
          ),
          catchError((err) =>
            of(
              EnrollmentActions.loadEnrollmentDialogOptionsFailure({
                error: err,
              })
            )
          )
        )
      )
    )
  );

  createEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) => {
        return this.createEnrollment(action.payload).pipe(
          // Si sale bien
          map((data) => EnrollmentActions.loadEnrollments()),
          // Si hay error
          catchError((error) =>
            of(EnrollmentActions.createEnrollmentFailure({ error }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  createEnrollment(payload: CreateEnrollmentPayload): Observable<Enrollments> {
    return this.httpClient.post<Enrollments>(
      `${environments.baseUrl}/enrollments`,
      payload
    );
  }

  getEnrollmentDialogOptions(): Observable<{
    courses: Course[];
    students: User[];
  }> {
    return forkJoin([
      this.httpClient.get<Course[]>(`${environments.baseUrl}/courses`),
      this.httpClient.get<User[]>(`${environments.baseUrl}/users?role=STUDENT`),
    ]).pipe(
      map(([courses, students]) => {
        return {
          courses,
          students,
        };
      })
    );
  }

  getEnrollments(): Observable<Enrollments[]> {
    return this.httpClient.get<Enrollments[]>(
      `${environments.baseUrl}/enrollments?_expand=course&_expand=user`
    );
  }
}