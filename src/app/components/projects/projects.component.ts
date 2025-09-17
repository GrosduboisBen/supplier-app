import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';
import { DialogEmitType } from 'src/app/dialogs/enum';
import { ProjectFormComponent } from 'src/app/dialogs/project-form/project-form.component';
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

  // force reload all entities
  forceReloadAll() {
    this.store.refresh().subscribe();
  }

openDialog(project?: Project): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, { data: project });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      switch (result.type) {
        case DialogEmitType.CREATE:
          this.store.add(result.data).subscribe();
          break;
        case DialogEmitType.UPDATE:
          this.store.update(result.data.id, result.data).subscribe();
          break;
        case DialogEmitType.DELETE:
          this.store.remove(result.data.id).subscribe();
          break;
        case DialogEmitType.CANCEL:
          break;
      }
    });
  }

  // delete: remove by id
  deleteProject(id: number): void {
    this.store.remove(id).subscribe();
  }
}
