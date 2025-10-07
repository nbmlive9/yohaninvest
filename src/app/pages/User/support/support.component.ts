import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

declare var bootstrap: any;
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {

   @ViewChild('successModal') successModal!: ElementRef;

     form:FormGroup;
      idData: any;
      errorMessage: any;
      adata: any;
      data1: any;
    errorMessage1: any;
      constructor(private api:UserService, private fb:FormBuilder, private router:Router, private toastr:ToastrService){
            this.form = this.fb.group({
                query: ['', [Validators.required,]],
                subject: ['', [Validators.required]],
              });
      }
    
      ngOnInit(){
        this.GetSupportData();
      }
    
    
        GetSupportData(){
        this.api.GetSupportTickets().subscribe((res:any)=>{
          console.log(res);
          this.adata=res.data;
          
        })
      }
    
       
    
      support() {
      const payload = {
        query: this.form.value.query,
        subject: this.form.value.subject,
      };
    
      this.api.AddSupport(payload).subscribe({
        next: (res: any) => {
          this.toastr.success('Support Ticket Created Successful!', 'Success');
    
          // Reset the form
          this.form.reset();
          this.idData = null;
          this.GetSupportData();
    
          // Show success modal
          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();
    
          // Automatically close modal and refresh page after 3 seconds
          setTimeout(() => {
            modalElement.hide(); // Close modal
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/support']); // Refresh the page
            });
          }, 2000); // 3000ms = 3 seconds
        },
        error: (err) => {
               this.errorMessage1 = 'Support Ticket Faild';
          // this.errorMessage = err?.error?.message || 'Activation failed.';
          this.toastr.error(this.errorMessage, 'Error');
        }
      });
    }

}
