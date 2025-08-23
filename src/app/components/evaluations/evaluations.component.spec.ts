import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluationsComponent } from './evaluations.component';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EvaluationsComponent', () => {
  let component: EvaluationsComponent;
  let fixture: ComponentFixture<EvaluationsComponent>;
  let evaluationService: jasmine.SpyObj<EvaluationService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('EvaluationService', ['getEvaluations', 'deleteEvaluation']);

    await TestBed.configureTestingModule({
      declarations: [EvaluationsComponent],
      imports: [MatTableModule, BrowserAnimationsModule],
      providers: [{ provide: EvaluationService, useValue: spy }]
    }).compileComponents();

    evaluationService = TestBed.inject(EvaluationService) as jasmine.SpyObj<EvaluationService>;
    evaluationService.getEvaluations.and.returnValue(of([
      { id: 1, rating: 5, comment: 'Excellent', missionId: 1 }
    ]));
    evaluationService.deleteEvaluation.and.returnValue(of(undefined));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load evaluations on init', () => {
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].comment).toBe('Excellent');
  });

  it('should call deleteEvaluation from the service', () => {
    component.deleteEvaluation(1);
    expect(evaluationService.deleteEvaluation).toHaveBeenCalledWith(1);
  });
});
