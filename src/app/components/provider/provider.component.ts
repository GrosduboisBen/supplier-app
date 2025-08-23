import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Provider } from 'src/app/models/provider';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.scss'],
    standalone: false
})
export class ProviderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'contact', 'category'];
  dataSource = new MatTableDataSource<Provider>();

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getProviders().subscribe((providers) => {
      this.dataSource.data = providers;
    });
  }
}
