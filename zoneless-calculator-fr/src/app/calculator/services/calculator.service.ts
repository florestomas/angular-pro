import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '%'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class calculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {
    //validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid Input', value);
      return;
    }
    if (value === '=') {
      // TODO
      console.log('Calcular resultado');
      return;
    }
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //Backspace
    //TODO : revisar cunado tengamos numeros negativos
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((currentValue) => currentValue.slice(0, -1));
      return;
    }

    // Aplicar operador
    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }
    // Limite numero de caracteres
    if (this.resultText().length >= 10) {
      console.log('Max lenght reached');
      return;
    }

    if (value == '.' && !this.resultText().includes('.')) {
      //Validar punto decimal
      if (this.resultText() == '0' || this.resultText() == '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((text) => text + '.');
      return;
    }

    //Manejo de el cero inical
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    //Cambio de signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((text) => text.slice(1));
        return;
      }
      this.resultText.update((text) => '-' + text);
      return;
    }

    //Numeros
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }
      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }
      this.resultText.update((text) => text + value);
      return;
    }
  }

  //  constructor() { }
}
