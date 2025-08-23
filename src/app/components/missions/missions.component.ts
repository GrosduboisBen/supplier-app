import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { MatTableDataSource } from '@angular/material/table';
import { Mission } from 'src/app/models/mission';

@Component({
    selector: 'app-missions',
    templateUrl: './missions.component.html',
    styleUrls: ['./missions.component.scss'],
    standalone: false
})
export class MissionsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'startDate', 'endDate', 'orderId', 'actions'];
  dataSource = new MatTableDataSource<Mission>();

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.missionService.getMissions().subscribe((missions) => {
      this.dataSource.data = missions;
    });
  }

  deleteMission(id: number): void {
    this.missionService.deleteMission(id).subscribe(() => {
      this.loadMissions();
    });
  }
}
