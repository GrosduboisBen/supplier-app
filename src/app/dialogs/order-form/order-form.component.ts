import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { Project } from 'src/app/models/project';
import { Provider } from 'src/app/models/provider';
import { ProjectStore } from 'src/app/stores/entities-stores/project-store';
import { ProviderStore } from 'src/app/stores/entities-stores/provider-store';
import { OrderStatus } from 'src/app/enum/order-status';
import { DialogEmitType } from '../enum';
import { getChangedFields } from 'src/app/shared/data/compare';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS
  ],
})
export class OrderFormComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public order: Order | null) {}

  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<OrderFormComponent>);
  projectStore = inject(ProjectStore);
  providerStore = inject(ProviderStore);

  form!: FormGroup;
  projects = signal<Project[]>([]);
  providers = signal<Provider[]>([]);
  orderStatuses = Object.values(OrderStatus);

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.order?.description ?? '', Validators.required],
      quantity: [this.order?.quantity ?? 1, [Validators.required, Validators.min(1)]],
      status: [this.order?.status ?? OrderStatus.PENDING, Validators.required],
      projectId: [this.order?.projectId ?? null, Validators.required],
      providerId: [this.order?.providerId ?? null, Validators.required],
    });

    this.projectStore.refresh().subscribe(() => this.projects.set(this.projectStore.all()));
    this.providerStore.refresh().subscribe(() => this.providers.set(this.providerStore.all()));
  }

  submit(): void {
    if (this.form.valid) {
      const formValue: Omit<Order, 'id'> = this.form.value;

      if (this.order) {
        const changes = getChangedFields<Order>(this.order, formValue);
        this.dialogRef.close({
          type: DialogEmitType.UPDATE,
          data: { id: this.order.id, ...changes }
        });
      } else {
        this.dialogRef.close({
          type: DialogEmitType.CREATE,
          data: formValue
        });
      }
    }
  }

  cancel(): void {
    this.dialogRef.close({ type: DialogEmitType.CANCEL });
  }
}
