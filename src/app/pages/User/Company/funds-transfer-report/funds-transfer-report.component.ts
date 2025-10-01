import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-funds-transfer-report',
  templateUrl: './funds-transfer-report.component.html',
  styleUrls: ['./funds-transfer-report.component.css']
})
export class FundsTransferReportComponent {
  data1: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.api.TransferReportTotal().subscribe((res:any)=>{
        console.log('transfer',res);
        this.data1=res.data;
    })
  }
}
