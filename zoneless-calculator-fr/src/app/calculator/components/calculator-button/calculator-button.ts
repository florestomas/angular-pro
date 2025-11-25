import { Attribute, Component, HostBinding, input, OnInit } from '@angular/core';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',

    // attribute: 'hola, voz de homero',
    // 'data-size': 'XL',
  },
})
export class CalculatorButton implements OnInit {
  public isCommmand = input(false, {
    transform: (value: boolean | string) => {
      return value === true || value === 'true';
    },
  });
  ngOnInit(): void {
    console.log(this.isCommmand());
  }

  @HostBinding('class.is-command') get commandStyle() {
    return this.isCommmand();
  }
}
