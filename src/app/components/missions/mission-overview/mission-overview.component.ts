import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MATERIAL_IMPORTS } from 'material.import';
import { Mission } from 'src/app/models/mission';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { HeaderStore } from 'src/app/stores/app-stores/header-store';
import { MissionStore } from 'src/app/stores/entities-stores/mission-store';

@Component({
  selector: 'app-mission-overview',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './mission-overview.component.html',
  styleUrl: './mission-overview.component.scss'
})
export class MissionOverviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private missionStore = inject(MissionStore);
  private orderService = inject(OrderService);

  mission = signal<Mission | null>(null);
  order = signal<Order | null>(null);

  constructor(private headerStore:HeaderStore){}

  ngOnInit(): void {
    if(this.headerStore.status() === false) {
      this.headerStore.setOverview();
      this.headerStore.setRoute('/missions');
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const orderId = Number(this.route.snapshot.paramMap.get('orderId'));

    this.missionStore.refreshOne(id).subscribe({
      next: (mission) => this.mission.set(mission)
    });

    this.orderService.getOrder(orderId).subscribe({
      next: (order) => this.order.set(order)
    });
  }

}
