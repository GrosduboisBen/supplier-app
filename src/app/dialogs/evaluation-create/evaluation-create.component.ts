import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';

import { Evaluation } from 'src/app/models/evaluation';
import { Mission } from 'src/app/models/mission';
import { MissionStore } from 'src/app/stores/entities-stores/mission-store';

@Component({
  selector: 'app-evaluation-create',
  templateUrl: './evaluation-create.component.html',
  styleUrls: ['./evaluation-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS,
  ],
})
export class EvaluationCreateComponent implements OnInit {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<EvaluationCreateComponent>);
  missionStore = inject(MissionStore);

  form: FormGroup = this.fb.group({
    rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: [''],
    missionId: [null, Validators.required],
  });

  missions: Mission[] = [];

  ngOnInit(): void {
    this.missionStore.refresh().subscribe({
      next: (data) => (this.missions = data),
      error: (err) => console.error('Failed to load missions', err),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const evaluation: Omit<Evaluation, 'id'> = this.form.value;
      this.dialogRef.close(evaluation);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
