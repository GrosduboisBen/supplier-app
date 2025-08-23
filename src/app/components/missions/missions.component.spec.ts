import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionsComponent } from './missions.component';
import { MissionService } from 'src/app/services/mission.service';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MissionsComponent', () => {
  let component: MissionsComponent;
  let fixture: ComponentFixture<MissionsComponent>;
  let missionService: jasmine.SpyObj<MissionService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MissionService', ['getMissions', 'deleteMission']);

    await TestBed.configureTestingModule({
      declarations: [MissionsComponent],
      imports: [MatTableModule, BrowserAnimationsModule],
      providers: [{ provide: MissionService, useValue: spy }]
    }).compileComponents();

    missionService = TestBed.inject(MissionService) as jasmine.SpyObj<MissionService>;
    missionService.getMissions.and.returnValue(of([
      { id: 1, title: 'Test Mission', description: 'Desc', startDate: '2025-08-01', endDate: '2025-08-10', orderId: 100 }
    ]));
    missionService.deleteMission.and.returnValue(of(undefined));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load missions on init', () => {
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].title).toBe('Test Mission');
  });

  it('should call deleteMission from the service', () => {
    component.deleteMission(1);
    expect(missionService.deleteMission).toHaveBeenCalledWith(1);
  });
});
