import { Injectable } from "@angular/core";
import { Enrollments } from "./models";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../users/models";
import { Course } from "../courses/models";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {

    users: User[] = [
        {
            id: 1,
            name: "Juan",
            lastName: "Perez",
            email: "juan@example.com",
            age: 30,
        },
        {
            id: 2,
            name: "Maria",
            lastName: "Gomez",
            email: "maria@example.com",
            age: 25,
        },
        {
            id: 3,
            name: "Luis",
            lastName: "Rodriguez",
            email: "luis@example.com",
            age: 35,
        },
    ];
    
    courses: Course[] = [
        {
            id: 1,
            name: "JavaScript Course",
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-02-28"),
        },
        {
            id: 2,
            name: "C# Course",
            startDate: new Date("2023-03-01"),
            endDate: new Date("2023-04-30"),
        },
        {
            id: 3,
            name: "Python Course",
            startDate: new Date("2023-05-01"),
            endDate: new Date("2023-06-30"),
        },
    ];

    enrollments: Enrollments[] = [
        {
            id: 1,
            userName: "Rodrigo",
            subscriptionTo: 'JavaScript',
        },
        {
            id: 2,
            userName: "Rodrigo",
            subscriptionTo: 'C#',
        },
        {
            id: 3,
            userName: "Rodrigo",
            subscriptionTo: 'JavaScript',
        },
    ];

    constructor(private fb: FormBuilder) { }
    

    getEnrollments$(): Observable<Enrollments[]> {
        console.log(this.enrollments)
        return of(this.enrollments || []);
    }

    getUsers$(): Observable<User[]> {
        console.log(this.users)
        return of(this.users);
    }

    getCourses$(): Observable<Course[]> {
        console.log(this.courses)
        return of(this.courses);
    }

    createEnrollment(enrollmentForm: FormGroup): Observable<Enrollments[]> {
        if (enrollmentForm.valid) {
          const userId = parseInt(enrollmentForm.get('userId')?.value, 10); // Convertir a número
          const courseId = parseInt(enrollmentForm.get('courseId')?.value, 10); // Convertir a número
      
          if (!isNaN(userId) && !isNaN(courseId)) { // Verificar que se pudo convertir correctamente
            const selectedUser = this.users.find(user => user.id === userId);
            const selectedCourse = this.courses.find(course => course.id === courseId);
      
            if (selectedUser && selectedCourse) {
              const newEnrollment: Enrollments = {
                id: this.enrollments.length + 1,
                userName: selectedUser.name,
                subscriptionTo: selectedCourse.name,
              };
              this.enrollments.push(newEnrollment);
      
              return of(this.enrollments);
            }
          }
        }
      
        return of([]);
      }

}