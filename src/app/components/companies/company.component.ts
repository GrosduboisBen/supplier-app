import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import {  MatDialog} from '@angular/material/dialog';
import { CompanyCreateComponent } from 'src/app/dialogs/company-create/company-create.component';
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
  displayedColumns = ['id', 'name', 'email', 'contact', 'industry'];
  companyService = inject(CompanyService);
  dialog = inject(MatDialog);

  companies = signal<Company[]>([]);

  ngOnInit(): void {
    this.refreshCompanies();
  }

  refreshCompanies(): void {
    this.companyService.getAll().subscribe(data => this.companies.set(data));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CompanyCreateComponent);

    dialogRef.afterClosed().subscribe((result: Company | null) => {
      if (result) {
        this.addCompany(result);
      }
    });
  }

  addCompany(payload: Company): void {
    this.companyService.create(payload).subscribe(() => {
      this.refreshCompanies(); // ✅ on recharge la liste
    });
  }
}
