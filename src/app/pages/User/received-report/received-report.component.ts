import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-received-report',
  templateUrl: './received-report.component.html',
  styleUrls: ['./received-report.component.css']
})
export class ReceivedReportComponent {
    data1: any;
          constructor(private api:UserService){}
          ngOnInit(){
            this.getData();
          }
  
          getData(){
            this.api.ReceivedWalletData().subscribe((res:any)=>{
                // console.log(res);
                this.data1=res.data;
            })
          }

}
