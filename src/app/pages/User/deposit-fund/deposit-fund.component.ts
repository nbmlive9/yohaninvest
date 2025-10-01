import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-deposit-fund',
  templateUrl: './deposit-fund.component.html',
  styleUrls: ['./deposit-fund.component.css']
})
export class DepositFundComponent {
  @ViewChild('successModal') successModal!: ElementRef;
  form: FormGroup;
  submitting = false;
   qrDataUrl: SafeUrl = '';
  paymentInfo: any = null;       // stores NOWPayments payment object
  paymentAddress: string = '';  // stores the NOWPayments payment object
  qrCodeDataUrl: SafeUrl = ''; // QR code for pay_address
  checkingStatus = false;
   payments: any[] = [];
  loading = false;
  errorMsg = '';
  ddata:any;
  alertMessage: string = '';
alertType: string = '';
  errorMessage: any;
  idData: any;
  ypdata: any;
    coinValue: number = 0; // from backend (0.00000017)
  calculatedCoins: number = 0; // result
  constructor(private api:UserService, private http:HttpClient, private token:TokenStorageService, private router:Router,   private fb: FormBuilder, private sanitizer: DomSanitizer){
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(10)]],
      transno:[''],
      note:['nowpayments url']
    });
  }

ngOnInit() {
  this.DepositeData();
  this.YohanPriceData();
}

DepositeData(){
   this.api.DepositeData().subscribe((res:any)=>{
    // console.log('depositdata',res);
    this.ddata=res.data;
 })
}

YohanPriceData(){
     this.api.YohanPrice().subscribe((res:any)=>{
    console.log('price',res);
    this.ypdata=res.data;
     this.coinValue = parseFloat(this.ypdata.coinvalue);
 })
}

formatAmount(event: any) {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount) && this.coinValue > 0) {
      this.calculatedCoins = amount / this.coinValue;
    } else {
      this.calculatedCoins = 0;
    }
  }


 onSubmit() {
  const payload = {
    amount: this.form.value.amount,
    transno: this.form.value.transno,
    note: this.form.value.note
  };

  this.api.DepositWallet(payload).subscribe({
    next: (res: any) => {
      // Reset the form
      this.form.reset();
      this.idData = null;
      this.DepositeData();

      // Show success modal
      const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
      modalElement.show();

      // Automatically close modal and refresh page after 3 seconds
      setTimeout(() => {
        modalElement.hide(); // Close modal
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/deposit']); // Refresh the page
        });
      }, 2000); // 3000ms = 3 seconds
    },
    error: (err) => {
      this.errorMessage = err?.error?.message || 'deposit failed.';
    }
  });
}


// formatAmount(event: any) {
//   let value = event.target.value;
//   value = value.replace(/[^0-9.]/g, '');
//   if ((value.match(/\./g) || []).length > 1) {
//     value = value.substring(0, value.length - 1);
//   }
//   if (value.includes('.')) {
//     const [intPart, decPart] = value.split('.');
//     if (decPart.length > 2) {
//       value = intPart + '.' + decPart.substring(0, 2);
//     }
//   }
//   event.target.value = value;
//   this.form.get('amount')?.setValue(value, { emitEvent: false });
// }

}
