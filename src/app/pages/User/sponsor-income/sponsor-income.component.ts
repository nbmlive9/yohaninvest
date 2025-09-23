import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sponsor-income',
  templateUrl: './sponsor-income.component.html',
  styleUrls: ['./sponsor-income.component.css']
})
export class SponsorIncomeComponent {
  data1: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.Reports();
  }

  Reports(){
    this.api.WalletReportData().subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.data1 = res.data.filter((item: any) => item.remark === 'Sponsor Credit');
      },
      error: (err) => {
        console.error('Error fetching deposit data:', err);
      }
    });
  }

}
