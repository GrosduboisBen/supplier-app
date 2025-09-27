import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import {  MatDialog} from '@angular/material/dialog';
import { CompanyFormComponent } from 'src/app/dialogs/company-form/company-form.component';
import { CompanyStore } from 'src/app/stores/entities-stores/company-store';
import { DialogEmitType } from 'src/app/dialogs/enum';
import { Router } from '@angular/router';
import { HeaderStore } from 'src/app/stores/app-stores/header-store';
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
  constructor(private store: CompanyStore,private router: Router,private headerStore: HeaderStore) {}

  displayedColumns = ['id', 'name', 'email', 'contact', 'industry'];
  companyService = inject(CompanyService);
  dialog = inject(MatDialog);

  companies = this.store.all;

  ngOnInit(): void {
    this.store.refresh().subscribe();
    this.headerStore.unsetOverview();
  }

  goToOverview(id: number) {
    this.router.navigate(['/companies', id, 'overview']);
    this.headerStore.setRoute(this.router.url);
    this.headerStore.setOverview();
  }

  openDialog(company?: Company): void {
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      data: company
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
}
