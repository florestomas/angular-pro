import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '%'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class calculatorService {
  public resultText = signal('10');
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
    //Validar punto decimal
    if (value == '.' && !this.resultText().includes('.')) {
      if (this.resultText() == '0' || this.resultText() == '') {
        this.resultText.update((text) => text + '0.');
      }
      return;
    }

    this.resultText.update((text) => text + '.');
  }

  //  constructor() { }
}
