import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-withdraw-report',
  templateUrl: './withdraw-report.component.html',
  styleUrls: ['./withdraw-report.component.css']
})
export class WithdrawReportComponent {
  data1: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.api.WithdrawReportsTotal().subscribe((res:any)=>{
        console.log('withdraw',res);
        this.data1=res.data;
    })
  }
}
