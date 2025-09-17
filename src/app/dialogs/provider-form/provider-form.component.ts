import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provider } from 'src/app/models/provider';
import { ProviderCategories } from 'src/app/enum/provider-categories';
import { DialogEmitType } from '../enum';
import { getChangedFields } from 'src/app/shared/data/compare';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS
  ],
})
export class ProviderFormComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public provider: Provider | null) {}

  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<ProviderFormComponent>);

  categories = ProviderCategories;
  categoryKeys = Object.keys(this.categories).filter(k => isNaN(Number(k)));
  categoryLabel(key: string): string {
    return this.categories[key as keyof typeof ProviderCategories];
  }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.provider?.name ?? '', Validators.required],
      contact: [this.provider?.contact ?? ''],
      email: [this.provider?.email ?? '', [Validators.required, Validators.email]],
      category: [this.provider?.category ?? ProviderCategories.DEVELOPMENT, Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formValue: Omit<Provider, 'id'> = this.form.value;

      if (this.provider) {
        const changes = getChangedFields<Provider>(this.provider, formValue);
        this.dialogRef.close({
          type: DialogEmitType.UPDATE,
          data: { id: this.provider.id, ...changes }
        });
      } else {
        this.dialogRef.close({
          type: DialogEmitType.CREATE,
          data: formValue
        });
      }
    }
  }

  delete(): void {
    if (this.provider) {
      this.dialogRef.close({ type: DialogEmitType.DELETE, data: this.provider });
    }
  }

  cancel(): void {
    this.dialogRef.close({ type: DialogEmitType.CANCEL });
  }
}
