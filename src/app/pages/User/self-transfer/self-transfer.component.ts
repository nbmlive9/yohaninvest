import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.css']
})
export class SelfTransferComponent {
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
      constructor(private api:UserService, private fb:FormBuilder, private router:Router, private toastr:ToastrService){
            this.form = this.fb.group({
                amount: ['', [Validators.required]],
                 remark: ['Self Transfer Fund'],
              });
      }
    
      ngOnInit(){
        this.GetActivationData();
        this.GetProfile();
      }
    
        GetProfile() {
        this.api.UDashboardData().subscribe({
          next: (res: any) => {
            // console.log('profile',res);
            
            this.data1 = res.data;
            this.pfdata = res.data.profiledata;
          }
        });
      }
    
    
        GetActivationData(){
        this.api.SelfTransferReport().subscribe((res:any)=>{
          // console.log(res);
          this.adata=res.data;
          
        })
      }
    
     
      transfer() {
      const payload = {
        amount: this.form.value.amount,
         remark: this.form.value.remark,
      };
    
      this.api.UserSelfTransferWallet(payload).subscribe({
        next: (res: any) => {
          this.toastr.success('Transfer Successful!', 'Success');
    
          // Reset the form
          this.form.reset();
          this.idData = null;
          this.GetActivationData();
    
          // Show success modal
          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();
    
          // Automatically close modal and refresh page after 3 seconds
          setTimeout(() => {
            modalElement.hide(); // Close modal
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/activation']); // Refresh the page
            });
          }, 3000); // 3000ms = 3 seconds
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Activation failed.';
          this.toastr.error(this.errorMessage, 'Error');
        }
      });
    }
    

}
