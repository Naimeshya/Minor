import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuissnessDetailsComponent } from './buissness-details.component';

describe('BuissnessDetailsComponent', () => {
  let component: BuissnessDetailsComponent;
  let fixture: ComponentFixture<BuissnessDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuissnessDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuissnessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
