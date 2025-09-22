import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-transfer-wallet',
  templateUrl: './transfer-wallet.component.html',
  styleUrls: ['./transfer-wallet.component.css']
})
export class TransferWalletComponent {
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
              wallettyoe: ['', [Validators.required,]],
              regid: ['', [Validators.required]],
              amount: ['', [Validators.required]],
               remark: ['Transfer Fund'],
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
      this.api.TransferWalletData().subscribe((res:any)=>{
        // console.log(res);
        this.adata=res.data;
        
      })
    }
  
     onRegisterIdSelect(event: any) {
  const id = event.target.value.trim();

  // If input is empty, reset messages and return
  if (!id) {
    this.regname = null;
    this.idselectmsg = '';
    //this.errorMessage = 'Userid is required';
    return;
  }

  // Call API only if id is not empty
  this.api.GetusersDataByRegID(id).subscribe(
    (res4: any) => {
      if (res4?.data?.length > 0) {
        this.regname = res4.data[0];
        this.idselectmsg = `Name: ${this.regname.name}`;
        this.errorMessage = ''; // Reset error
      } else {
        this.regname = null;
        this.idselectmsg = '';
        this.errorMessage = 'User Not Available';
      }
    },
    (err: any) => {
      this.regname = null;
      this.idselectmsg = '';
      this.errorMessage = 'User Not Available';
    }
  );
}
  
    transfer() {
    const payload = {
      regid: this.form.value.regid,
      wallettyoe: this.form.value.wallettyoe,
      amount: this.form.value.amount,
       remark: this.form.value.remark,
    };
  
    this.api.UserTransferUserWallet(payload).subscribe({
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
