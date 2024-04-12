export class Cfecha {
    constructor(public dia: number, public mes: number, public año: number) {}
  
    esFechaValida(): boolean {
      // Validamos si la fecha es válida
      const fecha = new Date(this.año, this.mes - 1, this.dia); // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11
      return (
        fecha.getFullYear() === this.año &&
        fecha.getMonth() === this.mes - 1 &&
        fecha.getDate() === this.dia
      );
    }
  }
  