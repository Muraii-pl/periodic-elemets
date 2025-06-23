import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-edit-element',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatInput,
  ],
  standalone: true,
  templateUrl: './edit-element.dialog.html',
  styleUrl: './edit-element.dialog.scss'
})
export class EditElementDialog {
  protected readonly data = inject<{ property: string; value: string }>(MAT_DIALOG_DATA);
  protected readonly valueInput = model(this.data.value)
  private readonly _dialogRef = inject(MatDialogRef<EditElementDialog>);


  onNoClick(): void {
    this._dialogRef.close();
  }
}
