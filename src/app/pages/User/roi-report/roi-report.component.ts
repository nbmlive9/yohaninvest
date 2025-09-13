import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-roi-report',
  templateUrl: './roi-report.component.html',
  styleUrls: ['./roi-report.component.css']
})
export class RoiReportComponent {

          data1: any;
          constructor(private api:UserService){}
          ngOnInit(){
            this.Getdata();
          }
  
          Getdata(){
            this.api.RoiReport().subscribe((res:any)=>{
                console.log(res);
                this.data1=res.data;
            })
          }
}
