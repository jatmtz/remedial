import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdedorComponent } from './perdedor.component';

describe('PerdedorComponent', () => {
  let component: PerdedorComponent;
  let fixture: ComponentFixture<PerdedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerdedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerdedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
