import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wrapped } from './wrapped';

describe('Wrapped', () => {
  let component: Wrapped;
  let fixture: ComponentFixture<Wrapped>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wrapped]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wrapped);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
