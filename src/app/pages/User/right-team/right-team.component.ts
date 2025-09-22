import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-right-team',
  templateUrl: './right-team.component.html',
  styleUrls: ['./right-team.component.css']
})
export class RightTeamComponent {

        data1: any;
        constructor(private api:UserService){}
        ngOnInit(){
          this.getRightTeam();
        }

        getRightTeam(){
          this.api.Rightteam().subscribe((res:any)=>{
              // console.log(res);
              this.data1=res.data;
          })
        }

}
