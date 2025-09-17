import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Company } from 'src/app/models/company';
import { CompanyStore } from 'src/app/stores/entities-stores/company-store';
import { DialogEmitType } from '../enum';
import { getChangedFields } from 'src/app/shared/data/compare';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS
  ],
})
export class ProjectFormComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public project: Project | null) {}

  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<ProjectFormComponent>);
  companyStore = inject(CompanyStore);

  form!: FormGroup;
  companies = signal<Company[]>([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.project?.title ?? '', Validators.required],
      description: [this.project?.description ?? ''],
      budget: [this.project?.budget ?? 0, [Validators.required, Validators.min(0)]],
      companyId: [this.project?.companyId ?? null, Validators.required],
    });

    this.companyStore.refresh().subscribe({
      next: () => this.companies.set(this.companyStore.all())
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formValue: Omit<Project, 'id' | 'companyName'> = this.form.value;

      if (this.project) {
        const changes = getChangedFields<Project>(this.project, formValue);
        this.dialogRef.close({
          type: DialogEmitType.UPDATE,
          data: { id: this.project.id, ...changes }
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
    if (this.project) {
      this.dialogRef.close({ type: DialogEmitType.DELETE, data: this.project });
    }
  }

  cancel(): void {
    this.dialogRef.close({ type: DialogEmitType.CANCEL });
  }
}
