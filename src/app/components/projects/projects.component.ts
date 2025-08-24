import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<Project[]>;
  projectService: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }
}
