import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { Evaluation } from 'src/app/models/evaluation';

@Component({
    selector: 'app-evaluations',
    templateUrl: './evaluations.component.html',
    styleUrls: ['./evaluations.component.scss'],
    standalone: false
})
export class EvaluationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'rating', 'comment', 'missionId'];
  dataSource = new MatTableDataSource<Evaluation>();

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit(): void {
    this.evaluationService.getEvaluations().subscribe((evaluations) => {
      this.dataSource.data = evaluations;
    });
  }

  deleteEvaluation(id: number): void {
    this.evaluationService.deleteEvaluation(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(e => e.id !== id);
    });
  }
}
