import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'material.import';

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
  dataSource = new MatTableDataSource<Order>();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.dataSource.data = orders;
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(o => o.id !== id);
    });
  }
}
