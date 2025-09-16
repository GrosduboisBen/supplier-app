import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';

import { Evaluation } from 'src/app/models/evaluation';
import { EvaluationStore } from 'src/app/stores/entities-stores/evaluation-store';
import { EvaluationCreateComponent } from 'src/app/dialogs/evaluation-create/evaluation-create.component';

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

  openDialog(): void {
    const dialogRef = this.dialog.open(EvaluationCreateComponent);

    dialogRef.afterClosed().subscribe((result: Evaluation | null) => {
      if (result) {
        this.addEvaluation(result);
      }
    });
  }

  addEvaluation(payload: Omit<Evaluation, 'id'>) {
    this.store.add(payload).subscribe();
  }
}
