import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_IMPORTS, MATERIAL_DIALOGS_IMPORTS } from 'material.import';
import { Project } from 'src/app/models/project';
import { Company } from 'src/app/models/company';
import { Order } from 'src/app/models/order';
import { ProjectService } from 'src/app/services/project.service';
import { CompanyService } from 'src/app/services/company.service';
import { OrderStatus } from 'src/app/enum/order-status';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    ...MATERIAL_DIALOGS_IMPORTS,
  ],
})
export class OrderFormComponent implements OnInit {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<OrderFormComponent>);
  projectService = inject(ProjectService);
  companyService = inject(CompanyService);

  form: FormGroup = this.fb.group({
    description: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    status: [OrderStatus.PENDING, Validators.required],
    projectId: [null, Validators.required],
    providerId: [null, Validators.required],
  });

  projects: Project[] = [];
  providers: Company[] = [];

  orderStatuses = Object.values(OrderStatus);

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (projects) => (this.projects = projects),
      error: (err) => console.error('Failed to load projects', err),
    });

    this.companyService.getAll().subscribe({
      next: (companies) => (this.providers = companies),
      error: (err) => console.error('Failed to load providers', err),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const order: Omit<Order, 'id'> = this.form.value;
      this.dialogRef.close(order);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
