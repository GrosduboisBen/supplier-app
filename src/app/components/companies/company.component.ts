import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
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


  ngOnInit(): void {
    this.companies$ = this.companyService.getAll();
  }
}
