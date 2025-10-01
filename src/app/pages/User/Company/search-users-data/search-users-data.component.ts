import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-search-users-data',
  templateUrl: './search-users-data.component.html',
  styleUrls: ['./search-users-data.component.css']
})
export class SearchUsersDataComponent {
 @ViewChild('successModal') successModal!: ElementRef;
   searchInput: string = '';
  userData: any = null;
  visible: boolean = false;
  repd:any
  pffdata: any;
  isEdit: boolean=true;
  userid: any;
noData: any;
    showDialog(row:any) {
      this.repd=row;
        this.visible = true;
    }
      form:FormGroup;
  constructor(private api:UserService, private router: Router, private fb:FormBuilder, private activeroute:ActivatedRoute) { 
    this.form = this.fb.group({
      regid: [''],
      name: [''],
      email: [''],
      country: [''],
      wallet1: ['']
    });
  }

  ngOnInit(): void {
  }

  onSearch() {
    if (!this.searchInput.trim()) return;
    this.api.SearchUserData(this.searchInput).subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
          this.userData = res.data;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
          this.userData = null;
        }
      });
  }

   openProfile(item: any) {
    // console.log("item:",item.regid);
    this.userid=item.regid
    
    this.isEdit = false;   
    this.pffdata = item;   

    this.form.patchValue({
      regid: item.regid,  // <-- Add this
      name: item.name,
      email: item.email,
      country: item.country,
      wallet1: item.wallet1
    });
    
    this.form.markAsPristine();
  }

  edit() {
    this.isEdit = true;
  }
  
  save() {
    const payload = this.form.value;
    const id = this.userid;   
  
    this.api.cupdateprofile(id, payload).subscribe({
      next: (res: any) => {
        // console.log("updateprofile:", res);
        if (res.status === 1) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cpdash']);
          });
          this.pffdata = { ...this.pffdata, ...payload };  
          this.isEdit = false;  
        } else {
        }
      },
      error: (err) => {
        console.error("updateprofile error:", err);
      }
    });
  }

}
