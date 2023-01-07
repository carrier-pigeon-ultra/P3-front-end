import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonalProfileComponent } from './view-personal-profile.component';

describe('ViewPersonalProfileComponent', () => {
  let component: ViewPersonalProfileComponent;
  let fixture: ComponentFixture<ViewPersonalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPersonalProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPersonalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
