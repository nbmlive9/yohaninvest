import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.css']
})
export class WithdrawRequestComponent implements OnInit {

  @ViewChild('successModal') successModal!: ElementRef;

  form: FormGroup;
  adata: any;
  cdata: any;
  data1: any;
  pfdata: any;

  charges: number = 0;
  netAmount: number = 0;
  errorMessage1: string = '';

  constructor(
    private api: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(10)]]
    });
  }

  ngOnInit() {
    this.PendingData();
    this.GetProfile();
    this.CompletedData();
  }

  GetProfile() {
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        this.data1 = res.data;
        this.pfdata = res.data.profiledata;
      },
      error: (err) => {
        this.toastr.error('Failed to load profile data', 'Error');
      }
    });
  }

  PendingData() {
    this.api.UserWithdrawPending().subscribe({
      next: (res: any) => {
        this.adata = res.data;
      },
      error: (err) => {
        this.toastr.error('Failed to load pending withdrawals', 'Error');
      }
    });
  }

  CompletedData() {
    this.api.UserWithdrawCompleted().subscribe({
      next: (res: any) => {
        this.cdata = res.data;
      },
      error: (err) => {
        this.toastr.error('Failed to load completed withdrawals', 'Error');
      }
    });
  }

  calculateNetAmount() {
    const amount = this.form.value.amount || 0;
    if (amount >= 10) {
      this.charges = amount * 0.10;  // 10% charges
      this.netAmount = amount - this.charges;
    } else {
      this.charges = 0;
      this.netAmount = 0;
    }
  }

  Withdraw() {
    if (this.form.invalid) {
      this.toastr.error('Please enter a valid amount (≥ 10)', 'Validation Error');
      return;
    }

    const amount = this.form.value.amount;
    const recipient = this.pfdata?.wallet1;

    if (!recipient || recipient.trim() === '') {
      this.toastr.error('Wallet address not found in profile', 'Error');
      return;
    }

    const payload = {
      recipient: recipient,
      amount: amount,
     flag: 1
    };

    console.log('Withdraw Payload:', payload);

    this.api.withdrawToBlockchain(payload).subscribe({
      next: (res: any) => {
        console.log('Withdraw Response:', res);

        if (res.success) {
          this.toastr.success(`Withdraw Successful! Tx Hash: ${res.transactionHash}`, 'Success');
          this.form.reset();
          this.CompletedData();

          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();

          setTimeout(() => {
            modalElement.hide();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/withdraw']);
            });
          }, 1000);
        } else if (res.error && res.error.toLowerCase().includes('approval')) {
          // Example: backend returns error message about admin approval
              setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/withdraw']);
            });
          }, 3000);
          this.toastr.warning('Your withdrawal request is pending admin approval.', 'Pending Approval');
        } else {
              setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/withdraw']);
            });
          }, 3000);
          this.toastr.error(res.error || 'Withdraw failed.', 'Error');
        }
      },
      error: (err) => {
        console.error('Withdraw Error:', err);
        this.errorMessage1 = 'Insufficient Funds or Server Error';
            setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/withdraw']);
            });
          }, 3000);
        this.toastr.error(this.errorMessage1, 'Error');
      }
    });
  }
}
