import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntityStore } from './global';
import { Project } from 'src/app/models/project';

@Injectable({ providedIn: 'root' })
export class ProjectStore extends EntityStore<Project> {
  constructor() {
    super(inject(HttpClient), `${environment.apiURL}/projects`);
  }
}
