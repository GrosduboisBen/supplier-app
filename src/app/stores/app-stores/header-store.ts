// entity-store.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export  class HeaderStore {
  protected overview = signal<boolean>(false);
  protected previousRoute = signal<string>('/projects');

  constructor(
    protected http: HttpClient,
  ) {}
  readonly status = this.overview.asReadonly();
  readonly back = this.previousRoute.asReadonly();

  setOverview() {
    this.overview.set(true)
  }
  unsetOverview() {
    this.overview.set(false)
  }

  setRoute(route: string) {
    this.previousRoute.set(route)
  }

  unsetRoute() {
    this.previousRoute.set('/projects')
  }
}
