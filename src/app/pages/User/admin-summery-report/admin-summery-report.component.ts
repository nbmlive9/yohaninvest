import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-summery-report',
  templateUrl: './admin-summery-report.component.html',
  styleUrls: ['./admin-summery-report.component.css']
})
export class AdminSummeryReportComponent {
  data1: any;

  constructor(private api:UserService){ }

  ngOnInit(){
    this.getdata();
  }

  getdata(){
    this.api.AdminDahsboardData().subscribe((res:any)=>{
        console.log('summery',res);
        this.data1=res.data;
    })
  }

}
