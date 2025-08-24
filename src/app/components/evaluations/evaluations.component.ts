import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Observable } from 'rxjs';
import { Evaluation } from 'src/app/models/evaluation';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
})
export class EvaluationsComponent implements OnInit {
  evaluations$!: Observable<Evaluation[]>;
  evaluationService: EvaluationService = inject(EvaluationService);

  ngOnInit(): void {
    this.evaluations$ = this.evaluationService.getEvaluations();
  }
}
