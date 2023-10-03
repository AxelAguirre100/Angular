import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  personaModel = {
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    edad: new FormControl('', [Validators.required, Validators.min(18)]),
  };

  ngOnInit(): void {
    this.guardar()
  }

  guardar() {
    if (this.personaModel.nombre.valid && this.personaModel.apellido.valid && this.personaModel.edad.valid) {
      const nombre = this.personaModel.nombre.value;
      const apellido = this.personaModel.apellido.value;
      const edad = this.personaModel.edad.value;
      console.log(`Nombre: ${nombre}, Apellido: ${apellido}, Edad: ${edad}`);
    } else {
    }
  }
}
