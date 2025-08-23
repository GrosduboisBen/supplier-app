import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from 'src/app/services/project.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
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
