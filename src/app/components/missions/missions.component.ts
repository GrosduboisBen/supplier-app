import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from 'material.import';
import { Observable } from 'rxjs';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

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
  missions$!: Observable<Mission[]>;
  missionService: MissionService = inject(MissionService);

  ngOnInit(): void {
    this.missions$ = this.missionService.getMissions();
  }

  deleteMission(id: number): void {
    this.missionService.deleteMission(id).subscribe(() => {
      this.missions$ = this.missionService.getMissions();
    });
  }
}
