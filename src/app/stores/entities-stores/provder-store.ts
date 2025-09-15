import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntityStore } from './global';
import { Provider } from 'src/app/models/provider';

@Injectable({ providedIn: 'root' })
export class ProviderStore extends EntityStore<Provider> {
  constructor() {
    super(inject(HttpClient), `${environment.apiURL}/providers`);
  }
}
