import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';
import { ProjectCreateComponent } from 'src/app/dialogs/project-create/project-create.component';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectStore } from 'src/app/stores/entities-stores/project-store';

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
  // injected store via constructor (keeps store testable and consistent)
  constructor(private store: ProjectStore) {}

  // columns used by the template
  displayedColumns = ['id', 'title', 'description', 'budget', 'company'];

  // legacy service kept for compatibility / specific calls if needed
  projectService = inject(ProjectService);

  // dialog injector
  dialog = inject(MatDialog);

  // readonly signal from the store
  projects = this.store.all;

  ngOnInit(): void {
    // initial load
    this.store.refresh().subscribe();
  }

  // update: call store.update then refresh the single updated item
  updateProject(id: number, changes: Partial<Project>) {
    this.store.update(id, changes).subscribe(() => {
      this.store.refreshOne(id).subscribe();
    });
  }

  // force reload all entities
  forceReloadAll() {
    this.store.refresh().subscribe();
  }

  // open create dialog; dialog should return the created payload (without id)
  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectCreateComponent);

    dialogRef.afterClosed().subscribe((result: Project | null) => {
      if (result) {
        this.addProject(result);
      }
    });
  }

  // add: cast to Omit<Project,'id'> to satisfy store signature
  addProject(payload: Project): void {
    this.store.add(payload as Omit<Project, 'id'>).subscribe();
  }

  // delete: remove by id
  deleteProject(id: number): void {
    this.store.remove(id).subscribe();
  }
}
