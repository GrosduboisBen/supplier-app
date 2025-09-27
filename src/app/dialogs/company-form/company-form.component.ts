import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/models/company';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogEmitType } from '../enum';
import { getChangedFields } from 'src/app/shared/data/compare';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,

      ...MATERIAL_IMPORTS,
      ...MATERIAL_DIALOGS_IMPORTS
    ],

})
export class CompanyFormComponent implements  OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public company: Company | null) {}
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<CompanyFormComponent>);


  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.company?.name ?? '', Validators.required],
      contact: [this.company?.contact ?? ''],
      email: [this.company?.email ?? '', [Validators.required, Validators.email]],
      industry: [this.company?.industry ?? '']
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formValue: Company = this.form.value;
      const data: Company = { ...this.company, ...formValue };

      if (this.company) {
        const changes = getChangedFields<Company>(this.company, formValue);
        this.dialogRef.close({
          type: DialogEmitType.UPDATE,
          data: { id: this.company.id, ...changes }
        });
      } else {
        this.dialogRef.close({
          type: DialogEmitType.CREATE,
          data
        });
      }
    }
  }

  cancel(): void {
    this.dialogRef.close({ type: DialogEmitType.CANCEL });
  }
}
