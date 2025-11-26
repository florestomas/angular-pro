import { Component } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  styles: [
    `
      /* @reference "tailwindcss";
      .is-command {
        @apply bg-indigo-700/20;
      }   aca no va porque afeca a todas las clases*/
    `,
  ],
})
export class Calculator {
  handleClick(key: string) {
    console.log({ key });
  }
}
