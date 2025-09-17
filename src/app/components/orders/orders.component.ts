import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';
import { Order } from 'src/app/models/order';
import { OrderStore } from 'src/app/stores/entities-stores/order-store';
import { OrderFormComponent } from 'src/app/dialogs/order-form/order-form.component';
import { DialogEmitType } from 'src/app/dialogs/enum';

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


  forceReloadAll() {
    this.store.refresh().subscribe();
  }

  openDialog(order?: Order): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: order ?? null
    });

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

  deleteOrder(id: number) {
    this.store.remove(id).subscribe();
  }
}
