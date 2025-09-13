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
  idData: any;
  pfdata: any;
  spinning = false;
  earnedAmount = 0;

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

    // Simulate random result (50 or 100)
    const result = Math.random() < 0.5 ? 50 : 100;
    const degree = result === 50 ? 1800 : 1890; // Adjust for realistic spins

    // Rotate the wheel
    const wheelElement = this.wheel.nativeElement;
    wheelElement.style.transition = 'transform 3s ease-out';
    wheelElement.style.transform = `rotate(${degree}deg)`;

    // After spin completes
    setTimeout(() => {
      this.earnedAmount = result;
      this.spinning = false;

      // Call API to register spin
      const payload = { amount: result };
      this.api.SpinRoll(payload).subscribe({
        next: (res: any) => {
          // Show success modal
          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();

          // Close modal and refresh page after 3 seconds
          setTimeout(() => {
            modalElement.hide();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/spinroll']);
            });
          }, 3000);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Spin failed.';
        }
      });
    }, 3000);
  }

  
}
