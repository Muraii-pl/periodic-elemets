import { PeriodicElement } from '../interfaces/PeriodicElement';

export type PeriodicElementState = {
  elements: PeriodicElement[];
  isLoading: boolean;
  filter: string
}
