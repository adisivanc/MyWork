import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloginComponent } from './prelogin.component';

describe('PreloginComponent', () => {
  let component: PreloginComponent;
  let fixture: ComponentFixture<PreloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
