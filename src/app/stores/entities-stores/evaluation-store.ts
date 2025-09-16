// company.store.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { EntityStore } from './global';
import { Evaluation } from 'src/app/models/evaluation';

@Injectable({ providedIn: 'root' })
export class EvaluationStore extends EntityStore<Evaluation> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/evaluations`);
  }
}
