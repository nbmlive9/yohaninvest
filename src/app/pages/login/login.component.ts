import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  constructor(private auth:AuthService, private fb:FormBuilder, private toastr:ToastrService, private token:TokenStorageService, private router:Router){
       this.form = this.fb.group({
      regid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(){}

    togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  Login(): void {
  if (!this.form.valid) {
    //this.toastr.error('Please fill in all fields correctly', 'Error');
    this.errorMessage = 'Please fill in all fields correctly', 'Error';
    return;
  }

  const { regid, password } = this.form.value;
  this.isLoading = true;
  this.errorMessage = '';

  this.auth.login(regid, password).subscribe({
    next: (res: any) => {
      this.isLoading = false;
      console.log('Login Response:', res); // DEBUG

      if (res?.status === 1) {
        // ✅ Success login
        this.token.saveToken(res.token);
        this.token.saveUser({ role: res.usertype });
        this.toastr.success('Login Successful!', 'Success');
        this.router.navigate(['/dashboard']);
      } else {
        // ❌ Error from API
        this.errorMessage = res?.message || 'Invalid username or password';
        //this.toastr.error(this.errorMessage, 'Error');
      }
    },
    error: (err) => {
      this.isLoading = false;
      console.error('Login error:', err); // Debugging
      this.errorMessage = 'Wrong Credentials. Please try again later.';
      //this.toastr.error(this.errorMessage, 'Error');
    },
  });
}


}
