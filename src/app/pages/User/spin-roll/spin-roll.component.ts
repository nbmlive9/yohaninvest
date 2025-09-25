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
spinCount: number = 0;

  prizes = [50, 100, 200, 300, 400, 500, 750, 1000];

  segmentColors = [
    '#28a745', '#007bff', '#ffc107', '#ff5722',
    '#9c27b0', '#00bcd4', '#e91e63', '#8bc34a'
  ];
  wdata: any;
  dpdata: any;
totalSpinAmount: number = 0;
  spinReward: any;
  constructor(private api: UserService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: ['', [Validators.required]]
    });
  }

  ngOnInit() {
      this.loadDashboardData();
    this.walletReport();
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        console.log(res);
        
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

  loadDashboardData() {
  this.api.UDashboardData().subscribe({
    next: (res: any) => {
      if (res?.data?.profiledata) {
        this.spinCount = Number(res.data.profiledata.spincount); // Get spincount from backend
        console.log('Current Spin Count:', this.spinCount);
      }
    },
    error: (err) => {
      console.error('Failed to load dashboard data:', err);
    }
  });
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

  // Check if user has spins available
  if (this.spinCount <= 0) {
    this.errorMessage = 'No spins available!';
    console.warn('No spins available');
    return;
  }

  this.spinning = true;

  // --- Get prize from backend dynamically ---
  // For now, let's simulate prize as either 50 or 100
  const backendPrize = this.spinReward || 50; // You can fetch dynamically from API
  const targetIndex = this.prizes.indexOf(backendPrize);

  if (targetIndex === -1) {
    console.error('Prize not found in wheel!');
    this.spinning = false;
    return;
  }

  const totalSegments = this.prizes.length;
  const segmentAngle = 360 / totalSegments;

  /**
   * Stop Angle Logic:
   * Pointer is fixed at the top (0°),
   * so wheel must rotate so that the center of the target segment
   * aligns perfectly under the pointer.
   */
  const stopAngle = targetIndex * segmentAngle + segmentAngle / 2;

  // --- Dynamic full spin logic based on prize ---
  let baseRotation = 360; // Default full spin
  if (backendPrize === 50) {
    baseRotation = 370; // Slightly offset for $50
  } else if (backendPrize === 100) {
    baseRotation = 380; // Slightly offset for $100
  }

  const finalAngle = (baseRotation * 5) + stopAngle;

  // Animate wheel
  const wheelEl = this.wheel.nativeElement;
  wheelEl.style.transition = 'transform 4s ease-out';
  wheelEl.style.transform = `rotate(-${finalAngle}deg)`; // Negative for clockwise rotation

  // --- After animation finishes ---
  setTimeout(() => {
    this.earnedAmount = backendPrize;
    this.spinning = false;

    // Reduce spin count by 1 after successful spin
    this.spinCount -= 1;

    // Notify backend about spin result
    this.api.SpinRoll({ amount: backendPrize }).subscribe({
      next: () => {
        const modal = new bootstrap.Modal(this.successModal.nativeElement);
        modal.show();

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
  }, 4000); // Match transition duration
}




}
