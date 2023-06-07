import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SignupApiService } from './signup-api.service';

describe('SignupApiService', () => {
  let service: SignupApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupApiService],
    });
    service = TestBed.inject(SignupApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user', () => {
    // NOTE: we don't unittest addUser() method, because this is only an HTTP POST call without any extra (business) logic
  });
});
