import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-roi-report-admin',
  templateUrl: './roi-report-admin.component.html',
  styleUrls: ['./roi-report-admin.component.css']
})
export class RoiReportAdminComponent {
 data1: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.api.RoiReportTotal().subscribe((res:any)=>{
        console.log('roi',res);
        this.data1=res.data;
    })
  }
}
