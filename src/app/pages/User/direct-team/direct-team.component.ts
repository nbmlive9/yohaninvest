import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-direct-team',
  templateUrl: './direct-team.component.html',
  styleUrls: ['./direct-team.component.css']
})
export class DirectTeamComponent {
  data1: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.getreferralData();
  }

  getreferralData(){
    this.api.DirectTeam().subscribe((res:any)=>{
      console.log(res);
      this.data1=res.data;
    })
  }

}
