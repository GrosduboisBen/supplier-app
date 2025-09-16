import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provider } from 'src/app/models/provider';
import { ProviderCategories } from 'src/app/enum/provider-categories';

@Component({
  selector: 'app-provider-create',
  templateUrl: './provider-create.component.html',
  styleUrls: ['./provider-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS
  ],
})
export class ProviderCreateComponent{
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<ProviderCreateComponent>);

  categories = ProviderCategories;
  categoryKeys = Object.keys(this.categories).filter(k => isNaN(Number(k))); // ['DEVELOPMENT','DESIGN',...]
  categoryLabel(key: string): string {
    return this.categories[key as keyof typeof ProviderCategories];
  }
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    contact: [''],
    email: ['', [Validators.required, Validators.email]],
    category: [ProviderCategories.DEVELOPMENT, Validators.required]
  });
  submit(): void {
    if (this.form.valid) {
      const provider: Provider = this.form.value;
      this.dialogRef.close(provider);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
