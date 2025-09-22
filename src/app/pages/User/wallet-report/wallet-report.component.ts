import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-wallet-report',
  templateUrl: './wallet-report.component.html',
  styleUrls: ['./wallet-report.component.css']
})
export class WalletReportComponent {
  data1: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.getWalletReport();
  }

  getWalletReport(){
    this.api.WalletReportData().subscribe((res:any)=>{
        // console.log(res);
        this.data1=res.data;
    })
  }

}
