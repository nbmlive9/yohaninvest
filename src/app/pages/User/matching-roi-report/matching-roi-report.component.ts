import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-matching-roi-report',
  templateUrl: './matching-roi-report.component.html',
  styleUrls: ['./matching-roi-report.component.css']
})
export class MatchingRoiReportComponent {


          data1: any;
          constructor(private api:UserService){}
          ngOnInit(){
            this.Getdata();
          }
  
          Getdata(){
            this.api.MatchingRoiReport().subscribe((res:any)=>{
                // console.log(res);
                this.data1=res.data;
            })
          }

}
