import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MATERIAL_IMPORTS } from 'material.import';
import { Order } from 'src/app/models/order';
import { Project } from 'src/app/models/project';
import { Provider } from 'src/app/models/provider';
import { ProjectService } from 'src/app/services/project.service';
import { ProviderService } from 'src/app/services/provider.service';
import { HeaderStore } from 'src/app/stores/app-stores/header-store';
import { OrderStore } from 'src/app/stores/entities-stores/order-store';

@Component({
  selector: 'app-order-overview',
  imports: [
    CommonModule,
      ...MATERIAL_IMPORTS
  ],
  templateUrl: './order-overview.component.html',
  styleUrl: './order-overview.component.scss'
})
export class OrderOverviewComponent implements OnInit {
private route = inject(ActivatedRoute);
  private orderStore = inject(OrderStore);
  private projectService = inject(ProjectService);
  private providerService = inject(ProviderService);

  order = signal<Order | null>(null);
  project = signal<Project| null>(null);
  provider = signal<Provider| null>(null);

  constructor(private headerStore:HeaderStore){}

  ngOnInit(): void {
    if(this.headerStore.status() === false) {
      this.headerStore.setOverview();
      this.headerStore.setRoute('/orders');
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    const providerId = Number(this.route.snapshot.paramMap.get('providerId'));

    this.orderStore.refreshOne(id).subscribe({
      next: (order) => this.order.set(order)
    });

    this.projectService.getById(projectId).subscribe({
      next: (projects) => this.project.set(projects)
    });
    this.providerService.getProviderById(providerId).subscribe({
      next: (provider) => this.provider.set(provider)
    });
  }
}
