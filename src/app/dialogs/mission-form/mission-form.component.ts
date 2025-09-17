import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mission } from 'src/app/models/mission';
import { Order } from 'src/app/models/order';
import { OrderStore } from 'src/app/stores/entities-stores/order-store';
import { DialogEmitType } from '../enum';
import { getChangedFields } from 'src/app/shared/data/compare';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class MissionFormComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public mission: Mission | null) {}

  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<MissionFormComponent>);
  orderStore = inject(OrderStore);

  form!: FormGroup;
  orders = signal<Order[]>([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.mission?.title ?? '', Validators.required],
      description: [this.mission?.description ?? ''],
      startDate: [this.mission?.startDate ?? '', Validators.required],
      endDate: [this.mission?.endDate ?? '', Validators.required],
      orderId: [this.mission?.orderId ?? null, Validators.required]
    });

    this.orderStore.refresh().subscribe({
      next: () => this.orders.set(this.orderStore.all())
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formValue: Omit<Mission, 'id'> = this.form.value;

      if (this.mission) {
        const changes = getChangedFields<Mission>(this.mission, formValue);
        this.dialogRef.close({
          type: DialogEmitType.UPDATE,
          data: { id: this.mission.id, ...changes }
        });
      } else {
        this.dialogRef.close({
          type: DialogEmitType.CREATE,
          data: formValue
        });
      }
    }
  }

  delete(): void {
    if (this.mission) {
      this.dialogRef.close({ type: DialogEmitType.DELETE, data: this.mission });
    }
  }

  cancel(): void {
    this.dialogRef.close({ type: DialogEmitType.CANCEL });
  }
}
