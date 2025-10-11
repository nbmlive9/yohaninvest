import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-direct-team',
  templateUrl: './direct-team.component.html',
  styleUrls: ['./direct-team.component.css']
})
export class DirectTeamComponent {
  data1: any[] = [];
  loading = true;

  constructor(private api: UserService) {}

  ngOnInit() {
    this.getreferralData();
  }

  getreferralData() {
    this.loading = true;
    this.api.DirectTeam().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.data1 = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.data1 = [];
        this.loading = false;
      }
    });
  }

  
}
