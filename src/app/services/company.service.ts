import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly baseUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl);
  }

  getById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/${id}`);
  }

  create(payload: Omit<Company, 'id'>): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, payload);
  }

  update(id: number, payload: Partial<Company>): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
