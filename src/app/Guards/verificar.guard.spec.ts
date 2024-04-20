import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verificarGuard } from './verificar.guard';

describe('verificarGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verificarGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
