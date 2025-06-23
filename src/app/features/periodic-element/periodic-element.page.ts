import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PeriodicStore } from '../../core/store/periodic-element.store';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PeriodicElement } from '../../core/interfaces/PeriodicElement';
import { MatDialog } from '@angular/material/dialog';
import { EditElementDialog } from '../ui/edit-element/edit-element.dialog';

@Component({
  selector: 'app-periodic-element',
  imports: [MatTableModule, FormsModule, MatInput, MatLabel, MatFormField],
  templateUrl: './periodic-element.page.html',
  standalone: true,
  styleUrl: './periodic-element.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PeriodicElementPage implements OnInit {
  public readonly periodicStore = inject(PeriodicStore);

  private _filter$ = new Subject<string>;
  private _destroyRef = inject(DestroyRef);
  private _dialog = inject(MatDialog);

  public ngOnInit() {
    this.periodicStore.loadElements();
    this._filter$
    .pipe(
      distinctUntilChanged(),
      debounceTime(2000),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(filter => {
      this.periodicStore.setFilter(filter);
    });
  }

  protected onFilterChange(filterValue: string) {
    this._filter$.next(filterValue);
  }

  protected openEditDialog(element: PeriodicElement, property: string, index: number) {
    const copyData = { ...element };
    const dialogRef = this._dialog.open(EditElementDialog, {
      width: '30%',
      data: {
        property: property,
        value: copyData[property]
      },
    });
    dialogRef.afterClosed().subscribe((value: string) => {
      if ( value ) {
        copyData[property] = value;
        this.periodicStore.updateData(copyData, index);
      }
    });
  }
}
