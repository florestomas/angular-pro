import { Calculator } from '@/calculator/components/calculator/calculator';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [
    Calculator
  ],
  templateUrl: './calculator-view.html',
})
export class CalculatorView { } // aca esta la clase que exporta
