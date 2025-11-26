import {
  Attribute,
  Component,
  HostBinding,
  input,
  OnInit,
  output,
  viewChild,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
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
export class CalculatorButton /* implements OnInit */ {
  public onClick = output<string>();

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommmand = input(false, {
    transform: (value: boolean | string | '') => {
      return value === true || value === 'true' || value === '';
    },
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) => {
      return value === true || value === 'true' || value === '';
    },
  });

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }
  /*   ngOnInit(): void {
    // Funcion que se ejecuta cuando el componente se inicializa
    console.log(this.isCommmand());
  } */

  /* @HostBinding('class.is-command') get commandStyle() {
    return this.isCommmand();
  } */

  // tamaño del =
  @HostBinding('class.w-2/4') get doubleSizeStyle() {
    return this.isDoubleSize();
  }
}
