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
@ViewChild('confirmModal') confirmModal!: ElementRef;



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
      amount: ['', [Validators.required, Validators.min(50)]],
      transno:['123456'],
      note:['Yohan Coins']
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
  let value = event.target.value;

  // 1. Keep only numbers and one decimal
  value = value.replace(/[^0-9.]/g, '');
  if ((value.match(/\./g) || []).length > 1) {
    value = value.substring(0, value.length - 1);
  }

  // 2. Restrict to 2 decimal places
  if (value.includes('.')) {
    const [intPart, decPart] = value.split('.');
    if (decPart.length > 2) {
      value = intPart + '.' + decPart.substring(0, 2);
    }
  }

  // 3. Push back into input & form
  event.target.value = value;
  this.form.get('amount')?.setValue(value, { emitEvent: false });

  // 4. Calculate Yohan coins
  const amount = parseFloat(value);
  if (!isNaN(amount) && this.coinValue > 0) {
    this.calculatedCoins = amount / this.coinValue;
  } else {
    this.calculatedCoins = 0;
  }
}

openConfirmModal() {
  const modal = new bootstrap.Modal(this.confirmModal.nativeElement);
  modal.show();
}

confirmDeposit() {
  const modal = bootstrap.Modal.getInstance(this.confirmModal.nativeElement);
  modal?.hide();
  this.onSubmit(); // call real submit
}

 onSubmit() {
  if (!this.form.valid) return;

  const confirmSubmit = window.confirm(
    `You are depositing ${this.form.value.amount} USDT. 
    You will receive approx. ${this.calculatedCoins} Yohan Coins. 
    Do you want to proceed?`
  );

  if (!confirmSubmit) {
    return; // user cancelled
  }

  const payload = {
    amount: this.form.value.amount,
    transno: this.form.value.transno,
    note: this.form.value.note
  };

  this.api.DepositWallet(payload).subscribe({
    next: (res: any) => {
      this.form.reset();
      this.idData = null;
 
      const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
      modalElement.show();

      setTimeout(() => {
        modalElement.hide();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/deposit']);
        });
      }, 2000);
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
