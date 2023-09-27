import { Component, OnInit } from '@angular/core';

interface Alumno {
  id: number;
  nombre: string;
  esAlumnoRegular: boolean;
}

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})

export class AlumnosComponent implements OnInit {
  alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan Perez', esAlumnoRegular: true },
    { id: 2, nombre: 'Maria Gonzalez', esAlumnoRegular: false },
    { id: 3, nombre: 'Pedro Rodriguez', esAlumnoRegular: true },
    { id: 4, nombre: 'Ana Lopez', esAlumnoRegular: false },
    { id: 5, nombre: 'Juan Martinez', esAlumnoRegular: false },
    { id: 6, nombre: 'Andres Fernandez', esAlumnoRegular: true },
  ];

  ngOnInit(): void {
  }
}
