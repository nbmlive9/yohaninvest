import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nonsecure-users-report',
  templateUrl: './nonsecure-users-report.component.html',
  styleUrls: ['./nonsecure-users-report.component.css']
})
export class NonsecureUsersReportComponent {
  data1: any;
  constructor(private api:UserService){}
   ngOnInit() {
    this.api.NonSecureUsersReport().subscribe((res: any) => {
      console.log('nonsecure', res);
      this.data1 = res.data;
    });
  }

}
