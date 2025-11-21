import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () => import('./calculator/views/calculator-view/calculator-view') .then(m => m.CalculatorView) //then no hace falta
  },
  {
    path: '**',
    redirectTo: 'calculator'
  }
];
