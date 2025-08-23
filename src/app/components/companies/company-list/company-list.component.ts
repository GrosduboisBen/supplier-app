import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {
  companies$!: Observable<Company[]>;
  displayedColumns = ['id', 'name', 'email', 'contact', 'industry'];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companies$ = this.companyService.getAll();
  }
}
