import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/models/company';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.scss',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,

      ...MATERIAL_IMPORTS,
      ...MATERIAL_DIALOGS_IMPORTS
    ],

})
export class CompanyCreateComponent {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<CompanyCreateComponent>);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    contact: [''],
    email: ['', [Validators.required, Validators.email]],
    industry: ['']
  });

  submit(): void {
    if (this.form.valid) {
      const company: Company = this.form.value;
      this.dialogRef.close(company);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
