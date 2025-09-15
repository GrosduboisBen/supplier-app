import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mission } from 'src/app/models/mission';
import { Order } from 'src/app/models/order';
import { MissionStore } from 'src/app/stores/entities-stores/mission-store';
import { OrderStore } from 'src/app/stores/entities-stores/order-store';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS
  ],
  providers: [
  provideNativeDateAdapter(),
  { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' } // ou 'fr-FR'
]
})
export class MissionCreateComponent implements OnInit {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<MissionCreateComponent>);
  missionStore = inject(MissionStore);
  orderStore = inject(OrderStore);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    orderId: [null, Validators.required]
  });

  orders = signal<Order[]>([]);

  ngOnInit(): void {
    // 🔄 Trigger refresh pour récupérer toutes les orders
    this.orderStore.refresh().subscribe({
      next: () => this.orders.set(this.orderStore.all())
    });
  }

  submit(): void {
    if (this.form.valid) {
      const mission: Omit<Mission, 'id'> = this.form.value;
      this.dialogRef.close(mission);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
