import { PeriodicElement } from '../interfaces/PeriodicElement';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { PeriodicElementState } from '../types/periodic-element-state.type';
import { computed } from '@angular/core';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },

  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },

  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },

  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },

  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },

  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },

  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },

  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },

  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },

  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

const initialState: PeriodicElementState = {
  elements: [],
  isLoading: true,
  filter: '',
};

export const PeriodicStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    keyList: computed(() => store.elements().length ? Object.keys(store.elements()[0]) : []),
    filteredElements: computed(() => {
      if ( store.filter() && store.elements().length ) {
        return store.elements().filter((element) => {
          return Object.values(element).some((value) => value.toString().toLowerCase().includes(store.filter())
          );
        });
      }
      return store.elements();
    })
  })),
  withMethods((store) => ({
    async loadElements() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      patchState(store, {
        elements: ELEMENT_DATA,
        isLoading: false
      });
    },
    setFilter(filterValue: string) {
      patchState(store, { filter: filterValue ? filterValue.toLowerCase() : '' });
    },
    updateData(data: PeriodicElement, index: number) {
      patchState(store, { elements: [...store.elements().slice(0, index), data, ...store.elements().slice(index + 1)] });
    }
  }))
);
