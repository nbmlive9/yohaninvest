import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-deposit-report',
  templateUrl: './deposit-report.component.html',
  styleUrls: ['./deposit-report.component.css']
})
export class DepositReportComponent {
  data1: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.api.DepositeReports().subscribe((res:any)=>{
        console.log('deposite',res);
        this.data1=res.data;
    })
  }

}
