import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MATERIAL_IMPORTS } from 'material.import';
import { Company } from 'src/app/models/company';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { CompanyStore } from 'src/app/stores/entities-stores/company-store';

@Component({
  selector: 'app-company-overview',
    imports: [
      CommonModule,
      ...MATERIAL_IMPORTS
    ],  templateUrl: './company-overview.component.html',
  styleUrl: './company-overview.component.scss'
})
export class CompanyOverviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private companyStore = inject(CompanyStore);
  private projectService = inject(ProjectService);

  company = signal<Company | null>(null);
  projects = signal<Project[]>([]);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // hydrate la company si nécessaire
    this.companyStore.refreshOne(id).subscribe({
      next: (company) => this.company.set(company)
    });

    this.projectService.getByCompanyId(id).subscribe({
      next: (projects) => this.projects.set(projects)
    });

    // hydrate les projets associés à la company
    this.projectService.getByCompanyId(id).subscribe({
      next: (projects) => this.projects.set(projects)
    });
  }
}
