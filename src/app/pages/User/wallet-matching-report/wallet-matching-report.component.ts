import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-wallet-matching-report',
  templateUrl: './wallet-matching-report.component.html',
  styleUrls: ['./wallet-matching-report.component.css']
})
export class WalletMatchingReportComponent {
        data1: any;
            constructor(private api:UserService){}
            ngOnInit(){
              this.Getdata();
            }
    
            Getdata(){
              this.api.MatchingWalletReport().subscribe((res:any)=>{
                  console.log(res);
                  this.data1=res.data;
              })
            }

}
