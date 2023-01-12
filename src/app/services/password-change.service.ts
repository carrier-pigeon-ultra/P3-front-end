import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordChangeService {
  resetFormUrl: string = `${environment.baseUrl}/reset-password-form`;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  bigBoy: string;
  resetPassword(password: string, token: string): void {
    const payload = { password: password };
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   this.bigBoy = params['token'];
    //   this.http
    //     .post(`${this.resetFormUrl}/${this.bigBoy}`, payload, {})
    //     .subscribe();
    //   console.log(this.bigBoy);
    // });
    // console.log(route);

    this.bigBoy = token;
    // this.bigBoy = this.activatedRoute.snapshot.params['token'];
    console.log(this.bigBoy);
    this.http
      .post(`${this.resetFormUrl}/${this.bigBoy}`, payload, {})
      .subscribe();
  }
}
