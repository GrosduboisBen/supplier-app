import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';
import { Order } from 'src/app/models/order';
import { OrderStore } from 'src/app/stores/entities-stores/order-store';
import { OrderCreateComponent } from 'src/app/dialogs/order-create/order-create.component';

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
  constructor(private store: OrderStore) {}
  dialog = inject(MatDialog);

  orders = this.store.all;

  ngOnInit(): void {
    this.store.refresh().subscribe();
  }

  updateOrder(id: number, changes: Partial<Order>) {
    this.store.update(id, changes).subscribe(() => {
      this.store.refreshOne(id).subscribe();
    });
  }

  forceReloadAll() {
    this.store.refresh().subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrderCreateComponent);

    dialogRef.afterClosed().subscribe((result: Order | null) => {
      if (result) {
        this.addOrder(result);
      }
    });
  }

  addOrder(payload: Order) {
    this.store.add(payload as Omit<Order, 'id'>).subscribe();
  }

  deleteOrder(id: number) {
    this.store.remove(id).subscribe();
  }
}
