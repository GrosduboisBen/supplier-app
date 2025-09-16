// entity-store.ts
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export abstract class EntityStore<T extends { id: number | string }> {
  protected items = signal<T[]>([]);

  constructor(
    protected http: HttpClient,
    private endpoint: string
  ) {}

  readonly all = this.items.asReadonly();

  // 🔄 Reload the entire list
  refresh(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint).pipe(
      tap((data) => this.items.set(data))
    );
  }

  // 🔄 Reload a specific item
  refreshOne(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`).pipe(
      tap((entity) =>
        this.items.update((list) => {
          const idx = list.findIndex((e) => e.id === id);
          if (idx >= 0) {
            // replace if already present
            const copy = [...list];
            copy[idx] = entity;
            return copy;
          }
          // otherwise add
          return [...list, entity];
        })
      )
    );
  }

  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  add(entity: Omit<T, 'id'>): Observable<T> {
    return this.http.post<T>(this.endpoint, entity).pipe(
      tap((created) => this.items.update((list) => [...list, created]))
    );
  }

  update(id: number | string, changes: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.endpoint}/${id}`, changes).pipe(
      tap((updated) =>
        this.items.update((list) =>
          list.map((e) => (e.id === updated.id ? updated : e))
        )
      )
    );
  }

  remove(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      tap(() => this.items.update((list) => list.filter((e) => e.id !== id)))
    );
  }
}
