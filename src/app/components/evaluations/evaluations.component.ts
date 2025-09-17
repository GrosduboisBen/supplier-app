import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';

import { Evaluation } from 'src/app/models/evaluation';
import { EvaluationStore } from 'src/app/stores/entities-stores/evaluation-store';
import { EvaluationFormComponent } from 'src/app/dialogs/evaluation-form/evaluation-form.component';
import { DialogEmitType } from 'src/app/dialogs/enum';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
  ],
})
export class EvaluationsComponent implements OnInit {
  constructor(private store: EvaluationStore) {}
  dialog = inject(MatDialog);

  evaluations = this.store.all;

  ngOnInit(): void {
    this.store.refresh().subscribe();
  }

  updateEvaluation(id: number, changes: Partial<Evaluation>) {
    this.store.update(id, changes).subscribe(() => {
      this.store.refreshOne(id).subscribe();
    });
  }

  deleteEvaluation(id: number) {
    this.store.remove(id).subscribe();
  }
  openDialog(evaluation?: Evaluation): void {
    const dialogRef = this.dialog.open(EvaluationFormComponent, {
      data: evaluation ?? null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      switch (result.type) {
        case DialogEmitType.CREATE:
          this.store.add(result.data).subscribe();
          break;
        case DialogEmitType.UPDATE:
          this.store.update(result.data.id, result.data).subscribe();
          break;
        case DialogEmitType.DELETE:
          this.store.remove(result.data.id).subscribe();
          break;
        case DialogEmitType.CANCEL:
          break;
      }
    });
  }


  addEvaluation(payload: Omit<Evaluation, 'id'>) {
    this.store.add(payload).subscribe();
  }
}
