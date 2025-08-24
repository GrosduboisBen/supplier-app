import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/models/provider';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      ...MATERIAL_IMPORTS
    ],
})
export class ProviderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'contact', 'category'];
  providers$!: Observable<Provider[]>;
  providerService: ProviderService = inject(ProviderService);

  ngOnInit(): void {
      this.providers$ = this.providerService.getProviders()
  }
}
