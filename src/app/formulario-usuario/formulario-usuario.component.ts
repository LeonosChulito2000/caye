import { Component } from '@angular/core';
import { Cfecha } from '../cfecha';

@Component({
selector: 'app-formulario-usuario',
templateUrl: './formulario-usuario.component.html'
})
export class FormularioUsuarioComponent {
nombre: string = '';
apellidoPaterno: string = '';
apellidoMaterno: string = '';
diaNacimiento: number = 0;
mesNacimiento: number = 0;
anioNacimiento: number = 0;
fechaValida: boolean = false;
rfc: string = '';

validarFecha(): void {
  const fecha = new Cfecha(this.diaNacimiento, this.mesNacimiento, this.anioNacimiento);
  this.fechaValida = fecha.esFechaValida();
}

calcularRFC(): void {
  // Se asume que el RFC se calcula tomando la primera letra del apellido paterno,
  // la primera vocal del apellido paterno, la primera letra del apellido materno,
  // la primera letra del nombre, el año de nacimiento (dos últimos dígitos), el mes de nacimiento y el día de nacimiento.
  if (this.fechaValida) {
    const apellidoPaternoRFC = this.apellidoPaterno.charAt(0);
    const primeraVocalPaterno = this.obtenerPrimeraVocal(this.apellidoPaterno);
    const apellidoMaternoRFC = this.apellidoMaterno.charAt(0);
    const nombreRFC = this.nombre.charAt(0);
    const añoNacimientoRFC = this.anioNacimiento.toString().substr(-2);
    const mesNacimientoRFC = this.mesNacimiento < 10 ? `0${this.mesNacimiento}` : this.mesNacimiento.toString();
    const diaNacimientoRFC = this.diaNacimiento < 10 ? `0${this.diaNacimiento}` : this.diaNacimiento.toString();
    
    this.rfc = `${apellidoPaternoRFC}${primeraVocalPaterno}${apellidoMaternoRFC}${nombreRFC}${añoNacimientoRFC}${mesNacimientoRFC}${diaNacimientoRFC}`.toUpperCase();
  } else {
    this.rfc = 'Fecha inválida, no se puede calcular RFC.';
  }
}

obtenerPrimeraVocal(texto: string): string {
  const vocales = ['a', 'e', 'i', 'o', 'u'];
  for (let letra of texto.toLowerCase()) {
    if (vocales.includes(letra)) {
      return letra.toUpperCase();
    }
  }
  return '';
}

onSubmit(): void {
  this.calcularRFC();
}
}
