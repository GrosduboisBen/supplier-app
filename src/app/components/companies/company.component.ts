import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import {  MatDialog} from '@angular/material/dialog';
import { CompanyFormComponent } from 'src/app/dialogs/company-form/company-form.component';
import { CompanyStore } from 'src/app/stores/entities-stores/company-store';
@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    standalone: true,
    imports: [
      CommonModule,
      ...MATERIAL_IMPORTS
    ],
    styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor(private store: CompanyStore) {}

  displayedColumns = ['id', 'name', 'email', 'contact', 'industry'];
  companyService = inject(CompanyService);
  dialog = inject(MatDialog);

  companies = this.store.all;

  ngOnInit(): void {
    this.store.refresh().subscribe();
  }

  updateCompany(id: number, changes: Partial<Company>) {
    this.store.update(id, changes).subscribe(() => {
      this.store.refreshOne(id).subscribe();
    });
  }

  forceReloadAll() {
    this.store.refresh().subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CompanyFormComponent);

    dialogRef.afterClosed().subscribe((result: Company | null) => {
      if (result) {
        this.addCompany(result);
      }
    });
  }

  addCompany(payload: Company): void {
    this.store.add(payload).subscribe();
  }
}
