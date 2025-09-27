import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MATERIAL_IMPORTS } from 'material.import';
import { Company } from 'src/app/models/company';
import { Project } from 'src/app/models/project';
import { CompanyService } from 'src/app/services/company.service';
import { HeaderStore } from 'src/app/stores/app-stores/header-store';
import { ProjectStore } from 'src/app/stores/entities-stores/project-store';

@Component({
  selector: 'app-project-overview',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss'
})
export class ProjectOverviewComponent implements OnInit {
private route = inject(ActivatedRoute);
  private projectStore = inject(ProjectStore);
  private companyService = inject(CompanyService);

  project = signal<Project | null>(null);
  company = signal<Company | null>(null);

  constructor(private headerStore:HeaderStore){}

  ngOnInit(): void {
    if(this.headerStore.status() === false) {
      this.headerStore.setOverview();
      this.headerStore.setRoute('/projects');
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const companyId = Number(this.route.snapshot.paramMap.get('companyId'));

    this.projectStore.refreshOne(id).subscribe({
      next: (project) => this.project.set(project)
    });

    this.companyService.getById(companyId).subscribe({
      next: (company) => this.company.set(company)
    });
  }
}
