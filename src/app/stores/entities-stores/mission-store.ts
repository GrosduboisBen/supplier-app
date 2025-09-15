// company.store.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { EntityStore } from './global';
import { Mission } from 'src/app/models/mission';

@Injectable({ providedIn: 'root' })
export class MissionStore extends EntityStore<Mission> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/missions`);
  }
}
