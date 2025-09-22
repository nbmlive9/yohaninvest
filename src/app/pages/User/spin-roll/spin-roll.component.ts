import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-spin-roll',
  templateUrl: './spin-roll.component.html',
  styleUrls: ['./spin-roll.component.css']
})
export class SpinRollComponent {
  @ViewChild('successModal') successModal!: ElementRef;
  @ViewChild('wheel') wheel!: ElementRef;

  form: FormGroup;
  errorMessage: any;
  pfdata: any;
  spinning = false;
  earnedAmount = 0;

  prizes = [50, 100, 200, 300, 400, 500, 750, 1000];

  segmentColors = [
    '#28a745', '#007bff', '#ffc107', '#ff5722',
    '#9c27b0', '#00bcd4', '#e91e63', '#8bc34a'
  ];
  wdata: any;
  dpdata: any;
totalSpinAmount: number = 0;
  constructor(private api: UserService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.walletReport();
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        this.pfdata = res.data.profiledata;
      }
    });

   this.api.DepositeData().subscribe({
  next: (res: any) => {
    // Filter array for dtype == 'spin'
    this.dpdata = res.data.filter((item: any) => item.dtype === 'spin');

    // Calculate total spin amount
    this.totalSpinAmount = this.dpdata.reduce((sum: number, item: any) => {
      return sum + Number(item.amount); // Convert string to number
    }, 0);

    console.log('Total Spin Amount:', this.totalSpinAmount);
  },
  error: (err) => {
    console.error('Error fetching deposit data:', err);
  }
});


  }

  walletReport(){
    this.api.WalletReportData().subscribe((res:any)=>{
      // console.log('report',res);
      this.wdata=res.data;
    })
  }

  // spin() {
  //   if (this.spinning) return;
  //   this.spinning = true;

  //   const backendPrize = Math.random() < 0.5 ? 50 : 100;

  //   const targetIndex = this.prizes.indexOf(backendPrize);
  //   const segmentAngle = 360 / this.prizes.length;
  //   const targetAngle = (targetIndex * segmentAngle) + (360 * 5);

  //   const wheelElement = this.wheel.nativeElement;
  //   wheelElement.style.transition = 'transform 4s ease-out';
  //   wheelElement.style.transform = `rotate(-${targetAngle}deg)`;

  //   setTimeout(() => {
  //     this.earnedAmount = backendPrize;
  //     this.spinning = false;

  //     const payload = { amount: backendPrize };
  //     this.api.SpinRoll(payload).subscribe({
  //       next: () => {
  //         const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
  //         modalElement.show();

  //         setTimeout(() => {
  //           modalElement.hide();
  //           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //             this.router.navigate(['/spinroll']);
  //           });
  //         }, 2000);
  //       },
  //       error: (err) => {
  //         this.errorMessage = err?.error?.message || 'Spin failed.';
  //       }
  //     });
  //   }, 4000);
  // }

 spin() {
  if (this.spinning) return;
  this.spinning = true;

  // 1️⃣ Get the last spin from backend
  this.api.DepositeData().subscribe((res: any) => {
    const spinTransactions = res.data.filter((t: any) => t.dtype === 'spin');
    if (!spinTransactions.length) {
      console.error('No spin transactions found!');
      this.spinning = false;
      return;
    }

    const lastSpin = spinTransactions[spinTransactions.length - 1];
    const backendPrize = Number(lastSpin.amount); // Convert to number
    // console.log('Backend prize:', backendPrize);

    // 2️⃣ Find the segment index of backendPrize
    const targetIndex = this.prizes.indexOf(backendPrize);
    if (targetIndex === -1) {
      console.error('Prize not found in wheel!');
      this.spinning = false;
      return;
    }

    const totalSegments = this.prizes.length;
    const segmentAngle = 360 / totalSegments;

    // 3️⃣ Calculate final rotation angle
    // 270 deg because pointer is at top (12 o'clock)
    const stopAngle = targetIndex * segmentAngle + segmentAngle / 2;
    const finalAngle = 360 * 5 + (320 - stopAngle); 

    // 4️⃣ Animate wheel
    const wheelEl = this.wheel.nativeElement;
    wheelEl.style.transition = 'transform 4s ease-out';
    wheelEl.style.transform = `rotate(${finalAngle}deg)`; // Note: positive rotation

    // 5️⃣ After spin ends
    setTimeout(() => {
      this.earnedAmount = backendPrize;
      this.spinning = false;

      // 6️⃣ Call SpinRoll API with correct prize
      this.api.SpinRoll({ amount: backendPrize }).subscribe({
        next: () => {
          const modal = new bootstrap.Modal(this.successModal.nativeElement);
          modal.show();
          // setTimeout(() => modal.hide(), 2000);
           setTimeout(() => {
            modal.hide();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/spinroll']);
            });
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Spin failed.';
        }
      });
    }, 4000); // Match CSS transition
  });
}



}
