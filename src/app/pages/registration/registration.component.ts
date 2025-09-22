import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

   selectedPosition: string = '';
  registerForm: FormGroup;
  form1!: FormGroup;
  numbercode:any;
  countries: string[] = [];
  codes: any[] = [];
  CountryCode: string = '';
  pffdata: any;
  errorMessage: any;
  idData: any;
 errorMessage1: any;
    idData1: any;
  udata: any;
  showPassword = false;
  constructor(private fb: FormBuilder,private router:Router, private api: UserService,private toast:ToastrService,private cdRef: ChangeDetectorRef) {
  
      this.registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        sponcerid: ['',Validators.required],
        placementid: ['', Validators.required],
        position: ['', Validators.required],
        terms: ['', Validators.required]
      },
       { validators: this.passwordMatchValidator }
      );
      
  }

    passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

   togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggles both fields together
  }

  ngOnInit(): void {
    // this.getCountries();
    this.getProfileData();

    this.registerForm.get('country')?.valueChanges.subscribe((selectedCountry: string) => {
      const selected = this.codes.find(
        (country: any) => country.name?.common === selectedCountry
      );
     
    });
    
  }


 sign(): void {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  const payload = { ...this.registerForm.value };

  this.api.UserRegistration(payload).subscribe({
    next: (res: any) => {
      this.udata = res.data; // Store registered user details
      this.toast.success(res?.message || 'Registration successful ✅', 'Success');

      this.registerForm.reset();
      this.cdRef.detectChanges();

      // Show Bootstrap modal
      const modalEl = document.getElementById('registrationModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
        modal.show();
      }
    },
    error: (err) => {
      this.toast.error(err?.error?.message || 'Registration failed. Please try again.', 'Error');
    }
  });
}



  getProfileData() {
    this.api.UProfile().subscribe((res: any) => {
      this.pffdata = res.data[0];
    });
  }
  // sadasdasdasds
// lll
  GetregistredData(id: any) {
    this.errorMessage = null;
    this.api.GetusersDataByRegID(id).subscribe({
      next: (res: any) => {
        if (res?.data?.length > 0) {
          this.idData = res.data[0];
          this.errorMessage = null;
        } else {
          this.idData = null;
          this.errorMessage = 'User not found.';
        }
      },
      error: (err) => {
        this.idData = null;
        this.errorMessage = err?.error?.message || 'Something went wrong.';
      }
    });
  }

  onRegIdKeyup() {
    const regid = this.registerForm.get('sponcerid')?.value;
    if (regid && regid.length >= 4) {
      this.GetregistredData(regid);
    } else {
      this.idData = null;
      this.errorMessage = null;
    }
  }

  GetregistredData1(id: any) {
    this.errorMessage1 = null;
    this.api.GetusersDataByRegID(id).subscribe({
      next: (res: any) => {
        if (res?.data?.length > 0) {
          this.idData1 = res.data[0];
          this.errorMessage1 = null;
        } else {
          this.idData1 = null;
          this.errorMessage1 = 'User not found.';
        }
      },
      error: (err) => {
        this.idData1 = null;
        this.errorMessage1 = err?.error?.message || 'Something went wrong.';
      }
    });
  }
  
  onRegIdKeyup1() {
    const regid = this.registerForm.get('placementid')?.value;
    if (regid && regid.length >= 4) {
      this.GetregistredData1(regid); // ✅ fixed
    } else {
      this.idData1 = null;
      this.errorMessage1 = null;
    }
  }

}
