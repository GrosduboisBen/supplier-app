import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Observable } from 'rxjs';
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
  companyService: CompanyService = inject(CompanyService);
  companies$!: Observable<Company[]>;
  displayedColumns = ['id', 'name', 'email', 'contact', 'industry'];
  dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(CompanyCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }

  ngOnInit(): void {
    this.companies$ = this.companyService.getAll();
  }
  addCompany(payload: Company): void {
    this.companyService.create(payload).subscribe(() => {
      this.companies$ = this.companyService.getAll();
    });
  }
}
