import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mat-snack-bar',
  templateUrl: './mat-snack-bar.component.html',
  styleUrls: ['./mat-snack-bar.component.css'],
})
export class MatSnackBarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}

  ngOnInit(): void {}
}
