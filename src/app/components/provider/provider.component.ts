import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MATERIAL_IMPORTS } from 'material.import';
import { DialogEmitType } from 'src/app/dialogs/enum';
import { ProviderFormComponent } from 'src/app/dialogs/provider-form/provider-form.component';
import { Provider } from 'src/app/models/provider';
import { ProviderService } from 'src/app/services/provider.service';
import { HeaderStore } from 'src/app/stores/app-stores/header-store';
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
  constructor(private store: ProviderStore,private router: Router,private headerStore: HeaderStore) {}

  displayedColumns = ['id', 'name', 'email', 'contact', 'category'];
  providerService = inject(ProviderService);
  dialog = inject(MatDialog);

  providers = this.store.all;

  ngOnInit(): void {
    this.store.refresh().subscribe();
  }

 openDialog(provider?: Provider): void {
    const dialogRef = this.dialog.open(ProviderFormComponent, {
      data: provider
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
