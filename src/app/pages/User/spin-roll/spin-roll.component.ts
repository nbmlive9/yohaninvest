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

  // Displayed prizes on the wheel
  prizes = [50, 100, 200, 300, 400, 500, 750, 1000];

  // Segment colors
  segmentColors = [
    '#28a745', '#007bff', '#ffc107', '#ff5722',
    '#9c27b0', '#00bcd4', '#e91e63', '#8bc34a'
  ];

  constructor(private api: UserService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        this.pfdata = res.data.profiledata;
      }
    });
  }

  spin() {
    if (this.spinning) return;
    this.spinning = true;

    // 1️⃣ Spin visually across any of the 8 segments
    const randomIndex = Math.floor(Math.random() * this.prizes.length);
    const visualPrize = this.prizes[randomIndex];

    // 2️⃣ Decide actual backend prize (only 50 or 100)
    const backendPrize = Math.random() < 0.5 ? 50 : 100;

    // Each segment covers 45 degrees
    const segmentAngle = 360 / this.prizes.length;
    const targetAngle = (randomIndex * segmentAngle) + (360 * 5); // 5 extra spins

    const wheelElement = this.wheel.nativeElement;
    wheelElement.style.transition = 'transform 4s ease-out';
    wheelElement.style.transform = `rotate(-${targetAngle}deg)`;

    // After spin completes
    setTimeout(() => {
      this.earnedAmount = backendPrize; // Show only 50 or 100
      this.spinning = false;

      // 3️⃣ Send only backendPrize (50 or 100) to backend
      const payload = { amount: backendPrize };
      this.api.SpinRoll(payload).subscribe({
        next: () => {
          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();

          // Auto-close modal and refresh
          setTimeout(() => {
            modalElement.hide();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/spinroll']);
            });
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Spin failed.';
        }
      });
    }, 2000);
  }
}
