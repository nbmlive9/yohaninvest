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
  dpdata: any;
  totalSpinAmount: number = 0;
  public selectedPosition: string = 'left'; 

setPosition(pos: string) {
  this.selectedPosition = pos;
}
  public selectedPosition1: string = 'right'; 

setPosition1(pos: string) {
  this.selectedPosition1 = pos;
}
  constructor(private api:UserService){}

  ngOnInit(){
    this.DashbOardData();
    this.SpinRewardTotal();
  }

    toggleShare() {
    this.showShareIcons = !this.showShareIcons;
  }

  SpinRewardTotal(){
       this.api.DepositeData().subscribe({
  next: (res: any) => {
    // Filter array for dtype == 'spin'
    this.dpdata = res.data.filter((item: any) => item.dtype === 'spin');

    // Calculate total spin amount
    this.totalSpinAmount = this.dpdata.reduce((sum: number, item: any) => {
      return sum + Number(item.amount); // Convert string to number
    }, 0);

    // console.log('Total Spin Amount:', this.totalSpinAmount);
  },
  error: (err) => {
    console.error('Error fetching deposit data:', err);
  }
});
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
    const textToShare = `Welcome to Yohan Invest Family! Please click the link below to join our team for SignUp:  https://yohaninv.live/yohan/auth-sponsorsignup/${regid}`;
    const encodedText = encodeURIComponent(textToShare);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }

copied = false;

copyValue(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    this.copied = true;

    // Hide message after 2 seconds
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

}
