import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';
import { ProviderFormComponent } from 'src/app/dialogs/provider-form/provider-form.component';
import { Provider } from 'src/app/models/provider';
import { ProviderService } from 'src/app/services/provider.service';
import { ProviderStore } from 'src/app/stores/entities-stores/provider-store';

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
  constructor(private store: ProviderStore) {}

  displayedColumns = ['id', 'name', 'email', 'contact', 'category'];
  providerService = inject(ProviderService);
  dialog = inject(MatDialog);

  providers = this.store.all;

  ngOnInit(): void {
    this.store.refresh().subscribe();
  }

  updateProvider(id: number, changes: Partial<Provider>) {
    this.store.update(id, changes).subscribe(() => {
      this.store.refreshOne(id).subscribe();
    });
  }

  forceReloadAll() {
    this.store.refresh().subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProviderFormComponent);

    dialogRef.afterClosed().subscribe((result: Provider | null) => {
      if (result) {
        this.addProvider(result);
      }
    });
  }

  addProvider(payload: Provider) {
    this.store.add(payload as Omit<Provider, 'id'>).subscribe();
  }

  deleteProvider(id: number) {
    this.store.remove(id).subscribe();
  }
}
