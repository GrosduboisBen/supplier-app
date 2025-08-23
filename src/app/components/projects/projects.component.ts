import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/models/project';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'material.import';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      ...MATERIAL_IMPORTS
    ],
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'budget', 'company'];
  dataSource = new MatTableDataSource<Project>();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.dataSource.data = projects;
    });
  }
}
