import { Component, computed, HostListener, inject, Inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { calculatorService } from '@/calculator/services/calculator.service';

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
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class Calculator {
  private calculatorService = inject(calculatorService);

  public calculatorButtons = viewChildren(CalculatorButton);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());
  /* get resultText() {  Forma completamente valida
    return this.calculatorService.resultText;
  } */

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  // @HostListener('document:keyup', ['$event']) Retrocompatilibidad
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
    };

    const key = event.key;

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
