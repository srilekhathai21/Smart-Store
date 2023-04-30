import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CustomerserviceService } from './customerservice.service';

describe('CustomerserviceService', () => {
  let service: CustomerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CustomerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get customer deatails', () => {
    const result = service.getCustomerDetails();
  });
  it('should be created', () => {
    const result = service.getCustomerBookingDetails();
  });
});
