import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-left-team',
  templateUrl: './left-team.component.html',
  styleUrls: ['./left-team.component.css']
})
export class LeftTeamComponent {

      data1: any;
    
      constructor(private api:UserService){}
    
      ngOnInit(){
        this.getLeftTeam();
      }
    
      getLeftTeam(){
        this.api.Leftteam().subscribe((res:any)=>{
            // console.log(res);
            this.data1=res.data;
        })
      }

}
