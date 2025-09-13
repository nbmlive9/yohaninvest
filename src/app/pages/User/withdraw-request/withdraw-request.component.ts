import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.css']
})
export class WithdrawRequestComponent {

   @ViewChild('successModal') successModal!: ElementRef;
        pack: any;
       form:FormGroup;
        idData: any;
        errorMessage: any;
         idselectmsg: string = '';
        regname:any;
        adata: any;
        data1: any;
        pfdata: any;
  cdata: any;
        constructor(private api:UserService, private fb:FormBuilder, private router:Router, private toastr:ToastrService){
              this.form = this.fb.group({
                  amount: ['', [Validators.required]],
                });
        }
      
        ngOnInit(){
          this.PendingData();
          this.GetProfile();
          this.CompletedData();
        }
      
          GetProfile() {
          this.api.UDashboardData().subscribe({
            next: (res: any) => {
              console.log('profile',res);
              
              this.data1 = res.data;
              this.pfdata = res.data.profiledata;
            }
          });
        }
      
      
          PendingData(){
          this.api.UserWithdrawPending().subscribe((res:any)=>{
            console.log(res);
            this.adata=res.data;
            
          })
        }

            CompletedData(){
          this.api.UserWithdrawCompleted().subscribe((res:any)=>{
            console.log(res);
            this.cdata=res.data;
            
          })
        }
      
       
        Withdraw() {
        const payload = {
          amount: this.form.value.amount,
        };
      
        this.api.UserWithdraw(payload).subscribe({
          next: (res: any) => {
            this.toastr.success('Withdraw Successful!', 'Success');
      
            // Reset the form
            this.form.reset();
            this.idData = null;
            this.PendingData();
      
            // Show success modal
            const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
            modalElement.show();
      
            // Automatically close modal and refresh page after 3 seconds
            setTimeout(() => {
              modalElement.hide(); // Close modal
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/withdraw']); // Refresh the page
              });
            }, 3000); // 3000ms = 3 seconds
          },
          error: (err) => {
            this.errorMessage = err?.error?.message || 'Withdraw failed.';
            this.toastr.error(this.errorMessage, 'Error');
          }
        });
      }

}
