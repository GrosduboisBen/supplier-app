import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'material.import';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      ...MATERIAL_IMPORTS
    ],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'quantity', 'status', 'projectId', 'providerId'];
  orderService: OrderService = inject(OrderService);
  orders$!: Observable<Order[]>;

  ngOnInit(): void {
      this.orders$ = this.orderService.getOrders();
  }

  // deleteOrder(id: number): void {
  //   this.orderService.deleteOrder(id).subscribe(() => {
  //     this.orders$ = this.orders$.filter(o => o.id !== id);
  //   });
  // }
}
