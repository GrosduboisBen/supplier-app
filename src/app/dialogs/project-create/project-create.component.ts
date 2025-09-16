import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Company } from 'src/app/models/company';
import { CompanyStore } from 'src/app/stores/entities-stores/company-store';

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
  companyStore = inject(CompanyStore);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    budget: [0, [Validators.required, Validators.min(0)]],
    companyId: [null, Validators.required],
  });

  companies = signal<Company[]>([]);

  ngOnInit(): void {
    // 🔄 Refresh pour récupérer toutes les companies depuis le store
    this.companyStore.refresh().subscribe({
      next: () => this.companies.set(this.companyStore.all())
    });
  }

  submit(): void {
    if (this.form.valid) {
      const project: Omit<Project, 'id' | 'companyName'> = this.form.value;
      this.dialogRef.close(project);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
