import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MATERIAL_IMPORTS } from 'material.import';
import { DialogEmitType } from 'src/app/dialogs/enum';
import { MissionFormComponent } from 'src/app/dialogs/mission-form/mission-form.component';
import { Mission } from 'src/app/models/mission';
import { HeaderStore } from 'src/app/stores/app-stores/header-store';
import { MissionStore } from 'src/app/stores/entities-stores/mission-store';

@Component({
  selector: 'app-mission',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
})
export class MissionsComponent implements OnInit {
  constructor(private store: MissionStore,private router: Router,private headerStore: HeaderStore) {}
  dialog = inject(MatDialog);

  missions = this.store.all;

  ngOnInit(): void {
    this.store.refresh().subscribe();
  }


  goToOverview(id: number,orderId: number) {
    console.log(orderId)
    this.router.navigate(['/missions', id, orderId, 'overview']);
    this.headerStore.setRoute(this.router.url);
    this.headerStore.setOverview();
  }

  openDialog(mission?: Mission): void {
    const dialogRef = this.dialog.open(MissionFormComponent, {
      data: mission
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
