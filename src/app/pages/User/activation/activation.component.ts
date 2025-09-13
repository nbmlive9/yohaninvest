import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent {
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
            packagetype: ['', [Validators.required,]],
            regid: ['', [Validators.required]],
            amount: ['', [Validators.required]],
          });
  }

  ngOnInit(){
    this.GetActivationData();
    this.GetProfile();
  }

    GetProfile() {
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        this.data1 = res.data;
        this.pfdata = res.data.profiledata;
      }
    });
  }

   // Validate amount input dynamically
  validateAmount(event: any) {
    const value = event.target.value;
    if (value && value % 100 !== 0) {
      this.form.controls['amount'].setErrors({ notMultipleOf100: true });
    } else {
      this.form.controls['amount'].setErrors(null);
    }
  }

    GetActivationData(){
    this.api.ActivationData().subscribe((res:any)=>{
      console.log(res);
      this.adata=res.data;
      
    })
  }

   onRegisterIdSelect(event: any) {
    const id = event.target.value;
    this.api.GetusersDataByRegID(id).subscribe(
      (res4: any) => {
        if (res4) {
          console.log(res4);
          this.regname = res4.data[0];
          this.idselectmsg = `Name: ${this.regname.name}`;
          this.errorMessage = ''; // Reset the error message when data is correct
        } else {
          console.log(res4);
          this.regname = null; // Reset the regname object when data is incorrect
          this.errorMessage = 'Error fetching user data';
          this.idselectmsg = 'User Not Available';
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.regname = null; // Reset the regname object when there's an error
        this.idselectmsg = '';
      }
    );
  }

  Activation() {
  const payload = {
    regid: this.form.value.regid,
    packagetype: this.form.value.packagetype,
    amount: this.form.value.amount,
  };

  this.api.Activate(payload).subscribe({
    next: (res: any) => {
      this.toastr.success('Activation Successful!', 'Success');

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


    Topup() {
      const payload = {
        regid: this.form.value.regid,
        packagetype: this.form.value.packagetype,
        amount: this.form.value.amount,
      };
  
      this.api.Topup(payload).subscribe({
        next: (res: any) => {
          this.toastr.success('Activation Successful!', 'Success');
          this.form.reset();
          this.idData = null;
          this.GetActivationData();
             // Show success modal
        const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
        modalElement.show();
         setTimeout(() => {
        modalElement.hide(); // Close modal
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/activation']); // Refresh the page
        });
      }, 3000);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Activation failed.';
          this.toastr.error(err?.error?.message || 'Activation failed.', 'Error');
        }
      });
    }


}
