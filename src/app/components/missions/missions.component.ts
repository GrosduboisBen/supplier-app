import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'material.import';
import { MissionCreateComponent } from 'src/app/dialogs/mission-create/mission-create.component';
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

  updateMission(id: number, changes: Partial<Mission>) {
     this.store.update(id, changes).subscribe(() => {
       this.store.refreshOne(id).subscribe();
     });
   }

   forceReloadAll() {
     this.store.refresh().subscribe();
   }

   openDialog(): void {
     const dialogRef = this.dialog.open(MissionCreateComponent);

     dialogRef.afterClosed().subscribe((result: Mission | null) => {
       if (result) {
         this.addMission(result);
       }
     });
   }

   addMission(payload: Mission) {
     this.store.add(payload as Omit<Mission, 'id'>).subscribe();
   }

   deleteMission(id: number) {
     this.store.remove(id).subscribe();
   }
}
