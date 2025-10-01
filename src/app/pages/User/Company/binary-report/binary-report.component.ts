import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-binary-report',
  templateUrl: './binary-report.component.html',
  styleUrls: ['./binary-report.component.css']
})
export class BinaryReportComponent {
 data1: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.api.BinaryReportsTotal().subscribe((res:any)=>{
        console.log('binary',res);
        this.data1=res.data;
    })
  }
}
