import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-wallet-today-report',
  templateUrl: './wallet-today-report.component.html',
  styleUrls: ['./wallet-today-report.component.css']
})
export class WalletTodayReportComponent {
    data1: any;
  
    constructor(private api:UserService){}
  
    ngOnInit(){
      this.getWalletReport();
    }
  
    getWalletReport(){
      this.api.WalletTodayReportData().subscribe((res:any)=>{
          // console.log(res);
          this.data1=res.data;
      })
    }
  

}
