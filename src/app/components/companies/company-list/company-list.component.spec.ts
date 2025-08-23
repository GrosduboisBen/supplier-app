import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8080/api/companies';

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [CompanyService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should GET all companies', () => {
    const mock: Company[] = [{ id: 1, name: 'Acme', email: 'info@acme.com', contact: 'John Doe', industry: 'Tech' }];

    service.getAll().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].name).toBe('Acme');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should POST a company', () => {
    const payload = { name: 'NewCo', email: 'hello@newco.com', contact: 'Jane', industry: 'Finance' };
    const returned: Company = { id: 99, ...payload };

    service.create(payload).subscribe((res) => {
      expect(res.id).toBe(99);
      expect(res.name).toBe('NewCo');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(returned);
  });
});
