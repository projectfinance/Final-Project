import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayemiComponent } from './payemi.component';

describe('PayemiComponent', () => {
  let component: PayemiComponent;
  let fixture: ComponentFixture<PayemiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayemiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayemiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
