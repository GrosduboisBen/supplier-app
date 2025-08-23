import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProjectsComponent } from './projects.component';
import { Project } from 'src/app/models/project';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectService } from 'src/app/services/project.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProjects']);

    await TestBed.configureTestingModule({
    declarations: [ProjectsComponent],
    imports: [MatTableModule, BrowserAnimationsModule],
    providers: [{ provide: ProjectService, useValue: projectServiceSpy }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
  });

  it('should display projects in table', () => {
    const mockProjects: Project[] = [
      { id: 1, title: 'Website Redesign', description: 'Corporate website redesign', budget: 10000, companyId: 1, companyName: 'Acme Inc.' },
      { id: 2, title: 'Mobile App', description: 'Build mobile app', budget: 20000, companyId: 1, companyName: 'Acme Inc.' }
    ];

    projectService.getProjects.and.returnValue(of(mockProjects));

    fixture.detectChanges(); // init component

    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0].title).toBe('Website Redesign');
    expect(component.dataSource.data[1].companyName).toBe('Acme Inc.');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table')).toBeTruthy();
    expect(compiled.textContent).toContain('Website Redesign');
    expect(compiled.textContent).toContain('Mobile App');
  });
});
