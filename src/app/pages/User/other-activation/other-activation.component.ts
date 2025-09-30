import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-other-activation',
  templateUrl: './other-activation.component.html',
  styleUrls: ['./other-activation.component.css']
})
export class OtherActivationComponent {

    @ViewChild('successModal') successModal!: ElementRef;
    pack: any;
    idData: any;
    errorMessage: any;
     idselectmsg: string = '';
    regname:any;
    adata: any;
    data1: any;
    pfdata: any;
    form1:FormGroup;
  errorMessage1: any;
    constructor(private api:UserService, private fb:FormBuilder, private router:Router, private toastr:ToastrService){
                this.form1 = this.fb.group({
              packagetype: ['', [Validators.required,]],
              regid: ['', [Validators.required]],
              amount: ['', [Validators.required]],
              atype: ['', [Validators.required]],
            });
    }
  
    ngOnInit(){
      this.GetActivationData();
      this.GetProfile();
      // Watch amount field to set default packagetype
  this.form1.get('amount')?.valueChanges.subscribe((val) => {
    if (val < 6000) {
      this.form1.patchValue({ packagetype: 'nonsecure' }, { emitEvent: false });
    } else {
      // Clear it so user can select when amount >= 6000
      this.form1.patchValue({ packagetype: '' }, { emitEvent: false });
    }
  });
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
  
     // Validate amount input dynamically
    validateAmount(event: any) {
      const value = event.target.value;
      if (value && value % 50 !== 0) {
        this.form1.controls['amount'].setErrors({ notMultipleOf100: true });
      } else {
        this.form1.controls['amount'].setErrors(null);
      }
    }
  
      GetActivationData(){
      this.api.ActivationData().subscribe((res:any)=>{
        // console.log(res);
        this.adata=res.data;
        
      })
    }
  
     onRegisterIdSelect(event: any) {
      const id = event.target.value;
      this.api.GetusersDataByRegID(id).subscribe(
        (res4: any) => {
          if (res4) {
            // console.log(res4);
            this.regname = res4.data[0];
            this.idselectmsg = `Name: ${this.regname.name}`;
            this.errorMessage = ''; // Reset the error message when data is correct
          } else {
            // console.log(res4);
            this.regname = null; // Reset the regname object when data is incorrect
            this.errorMessage = 'Error fetching user data';
            this.idselectmsg = 'User Not Available';
          }
        },
        (err: any) => {
          this.errorMessage = 'user not found';
          this.regname = null; // Reset the regname object when there's an error
          this.idselectmsg = '';
        }
      );
    }
  
  
      Topup() {
        const payload = {
          regid: this.form1.value.regid,
          packagetype: this.form1.value.packagetype,
          amount: this.form1.value.amount,
          atype: this.form1.value.atype,
        };
    
        this.api.UserActivate(payload).subscribe({
          next: (res: any) => {
            this.toastr.success('Activation Successful!', 'Success');
            this.form1.reset();
            this.idData = null;
            this.GetActivationData();
               // Show success modal
          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();
           setTimeout(() => {
          modalElement.hide(); // Close modal
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/useractivation']); // Refresh the page
          });
        }, 2000);
          },
          error: (err) => {
             this.errorMessage1 = 'Activation Fund Low';
            // this.errorMessage1 = err?.error?.message || 'Activation failed.';
            this.toastr.error(err?.error?.message || 'Activation failed.', 'Error');
          }
        });
      }

}
