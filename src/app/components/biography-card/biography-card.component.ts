import { Component, OnInit, Output, Input } from '@angular/core';
import PersonalInformation from 'src/app/models/PersonalInformation';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-biography-card',
  templateUrl: './biography-card.component.html',
  styleUrls: ['./biography-card.component.css']
})
export class BiographyCardComponent implements OnInit {

  @Input() user:User;
  @Output() doneEditing:boolean;

  constructor(private authService:AuthService ) { }

  ngOnInit(): void {
    
  }
}
