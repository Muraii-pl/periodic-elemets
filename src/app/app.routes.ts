import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/periodic-element/periodic-element.page').then(m => m.PeriodicElementPage)
  }
];
