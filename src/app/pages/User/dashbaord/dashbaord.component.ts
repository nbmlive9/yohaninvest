import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent {
  data1: any;
  pfdata: any;
  loading: boolean = true;
  constructor(private api:UserService){}

  ngOnInit(){
    this.DashbOardData();
  }

  DashbOardData() {
    this.loading = true; // start loading
    this.api.UDashboardData().subscribe(
      (res: any) => {
        console.log('Dashboard Data:', res);
        this.data1 = res.data;
        this.pfdata = res.data.profiledata;
        this.loading = false; // stop loading
      },
      (error) => {
        console.error('Error fetching dashboard data', error);
        this.loading = false; // stop loading even if there's an error
      }
    );
  }

}
