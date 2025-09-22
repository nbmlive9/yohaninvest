import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-transfer-report',
  templateUrl: './transfer-report.component.html',
  styleUrls: ['./transfer-report.component.css']
})
export class TransferReportComponent {
  data1: any;
            constructor(private api:UserService){}
            ngOnInit(){
              this.getData();
            }
    
            getData(){
              this.api.TransferWalletData().subscribe((res:any)=>{
                  // console.log(res);
                  this.data1=res.data;
              })
            }

}
