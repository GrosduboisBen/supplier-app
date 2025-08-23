import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrderService } from 'src/app/services/order.service';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderStatus } from 'src/app/enum/order-status';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('OrderService', ['getOrders', 'deleteOrder']);

    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [MatTableModule, BrowserAnimationsModule],
      providers: [{ provide: OrderService, useValue: spy }]
    }).compileComponents();

    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    orderService.getOrders.and.returnValue(of([
      { id: 1, description: 'Test Order', quantity: 5, status: OrderStatus.PENDING, projectId: 1, providerId: 1 }
    ]));
    orderService.deleteOrder.and.returnValue(of(undefined));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on init', () => {
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].description).toBe('Test Order');
  });

  it('should call deleteOrder from the service', () => {
    component.deleteOrder(1);
    expect(orderService.deleteOrder).toHaveBeenCalledWith(1);
  });
});
