// company.store.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { EntityStore } from './global';
import { Order } from 'src/app/models/order';

@Injectable({ providedIn: 'root' })
export class OrderStore extends EntityStore<Order> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/orders`);
  }
}
