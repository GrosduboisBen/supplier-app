import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';
import { DialogEmitType } from 'src/app/dialogs/enum';
import { MissionFormComponent } from 'src/app/dialogs/mission-form/mission-form.component';
import { Mission } from 'src/app/models/mission';
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
  constructor(private store: MissionStore) {}
  dialog = inject(MatDialog);

  missions = this.store.all;

  ngOnInit(): void {
    this.store.refresh().subscribe();
  }

   forceReloadAll() {
     this.store.refresh().subscribe();
   }

  openDialog(mission?: Mission): void {
    const dialogRef = this.dialog.open(MissionFormComponent, {
      data: mission ?? null
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

   deleteMission(id: number) {
     this.store.remove(id).subscribe();
   }
}
