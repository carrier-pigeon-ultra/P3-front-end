import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyCardComponent } from './biography-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/User';


describe('BiographyCardComponent', () => {
  let component: BiographyCardComponent;
  let fixture: ComponentFixture<BiographyCardComponent>;
  let authService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ BiographyCardComponent ],
      providers: [AuthService ]
    })
    .compileComponents();


    let authUser:User = new User(0,"email","Jan","Hus",new Date(), "A", "A", "");
    authService = TestBed.inject(AuthService);
    authService.currentUser = authUser;


    fixture = TestBed.createComponent(BiographyCardComponent);
    component = fixture.componentInstance;
    component.user = authUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
