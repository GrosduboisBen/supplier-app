// company.store.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { EntityStore } from './global';
import { Company } from 'src/app/models/company';

@Injectable({ providedIn: 'root' })
export class CompanyStore extends EntityStore<Company> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/companies`);
  }
}
