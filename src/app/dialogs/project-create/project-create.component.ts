import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS
  ],
})
export class ProjectCreateComponent implements OnInit {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<ProjectCreateComponent>);
  companyService = inject(CompanyService);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    budget: [0, [Validators.required, Validators.min(0)]],
    companyId: [null, Validators.required],
  });

  companies: Company[] = [];

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (companies) => (this.companies = companies),
      error: (err) => console.error('Failed to load companies', err),
    });
  }

  submit(): void {
    if (this.form.valid) {
      // `id` and `companyName` will be filled server-side
      const project: Omit<Project, 'id' | 'companyName'> = this.form.value;
      this.dialogRef.close(project);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
