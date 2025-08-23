import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { Provider } from 'src/app/models/provider';
import { ProviderService } from 'src/app/services/provider.service';
import { ProviderComponent } from './provider.component';

describe('ProvidersComponent', () => {
  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;
  let providerServiceMock: any;

  const mockProviders: Provider[] = [
    { id: 1, name: 'John Doe', email: 'john@provider.com', contact: '123456789', category: 'DEVELOPMENT' },
    { id: 2, name: 'Jane Smith', email: 'jane@provider.com', contact: '987654321', category: 'MARKETING' }
  ];

  beforeEach(async () => {
    providerServiceMock = {
      getProviders: jasmine.createSpy('getProviders').and.returnValue(of(mockProviders))
    };

    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [ProviderComponent],
      providers: [
        { provide: ProviderService, useValue: providerServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate dataSource with providers from service', () => {
    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data).toEqual(mockProviders);
  });

  it('should have the correct displayed columns', () => {
    expect(component.displayedColumns).toEqual(['id', 'name', 'email', 'contact', 'category']);
  });
});
