import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { Evaluation } from 'src/app/models/evaluation';
import { Mission } from 'src/app/models/mission';
import { MissionStore } from 'src/app/stores/entities-stores/mission-store';
import { DialogEmitType } from '../enum';
import { getChangedFields } from 'src/app/shared/data/compare';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS,
  ],
})
export class EvaluationFormComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public evaluation: Evaluation | null) {}

  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<EvaluationFormComponent>);
  missionStore = inject(MissionStore);

  form!: FormGroup;
  missions = signal<Mission[]>([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: [this.evaluation?.rating ?? 3, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [this.evaluation?.comment ?? ''],
      missionId: [this.evaluation?.missionId ?? null, Validators.required],
    });

    this.missionStore.refresh().subscribe(() => this.missions.set(this.missionStore.all()));
  }

  submit(): void {
    if (!this.form.valid) return;

    const formValue = this.form.value;

    if (this.evaluation) {
      const changes = getChangedFields<Evaluation>(this.evaluation, formValue);
      this.dialogRef.close({
        type: DialogEmitType.UPDATE,
        data: { id: this.evaluation.id, ...changes }
      });
    } else {
      this.dialogRef.close({
        type: DialogEmitType.CREATE,
        data: formValue
      });
    }
  }

  cancel(): void {
    this.dialogRef.close({ type: DialogEmitType.CANCEL });
  }

  delete(): void {
    if (this.evaluation) {
      this.dialogRef.close({ type: DialogEmitType.DELETE, data: this.evaluation });
    }
  }
}
