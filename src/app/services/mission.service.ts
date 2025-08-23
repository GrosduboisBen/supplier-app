import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = 'http://localhost:8080/api/missions'; // adapte selon ton API

  constructor(private http: HttpClient) {}

  // GET /api/missions
  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  // GET /api/missions/{id}
  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

  // POST /api/missions
  createMission(mission: Omit<Mission, 'id'>): Observable<Mission> {
    return this.http.post<Mission>(this.apiUrl, mission);
  }

  // PUT /api/missions/{id}
  updateMission(id: number, mission: Omit<Mission, 'id'>): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${id}`, mission);
  }

  // DELETE /api/missions/{id}
  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
