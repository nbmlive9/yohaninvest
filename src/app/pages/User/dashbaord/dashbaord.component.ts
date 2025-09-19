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
    showShareIcons = false;
  constructor(private api:UserService){}

  ngOnInit(){
    this.DashbOardData();
  }

    toggleShare() {
    this.showShareIcons = !this.showShareIcons;
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

    sharwahtsapp(regid: any) {
    const textToShare = `Welcome to Yohan Invest Family! Please click the link below to join our team for SignUp:  https://yohaninv.live/auth-sponsorsignup/${regid}`;
    const encodedText = encodeURIComponent(textToShare);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }

}
