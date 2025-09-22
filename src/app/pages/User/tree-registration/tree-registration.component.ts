import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-tree-registration',
  templateUrl: './tree-registration.component.html',
  styleUrls: ['./tree-registration.component.css']
})
export class TreeRegistrationComponent {

   selectedPosition: string = '';
    
      registerForm!: FormGroup;
      pffdata: any;
      errorMessage: any;
      idData: any;
          errorMessage1: any;
      idData1: any;
      form1!:FormGroup;
    id:any;
     numbercode:any;
    countries: string[] = [];
    codes: any[] = [];
    CountryCode: string = '';
    hpdata:any;
    regid:any;
    position:any;
  udata: any;
      constructor(private fb: FormBuilder,private router:Router, private api: UserService, private activeroute:ActivatedRoute,private toast:ToastrService) {
          this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        // country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]], // ✅ min 6 chars
        sponcerid: [''],
        position: [''], 
        placementid: ['',],
        terms: [false, Validators.requiredTrue] // ✅ checkbox must be checked
      });
      }
    
      ngOnInit(): void {
          this.regid = this.activeroute.snapshot.paramMap.get('regid') || '';
          // console.log("regid:",this.regid);
          
    this.position = this.activeroute.snapshot.paramMap.get('position') || '';
           this.Country();
           this.getCountries();
        this.getProfileData();

     this.api.UDashboardData().subscribe((res: any) => {
      // console.log("profiledata:", res);
      this.hpdata = res.data.profiledata;
      // console.log("pffdata:", this.hpdata);
    });

           this.registerForm.get('country')?.valueChanges.subscribe((selectedCountry: string) => {
        const selected = this.codes.find(
          (country: any) => country.name?.common === selectedCountry
        );
      
        if (selected) {
          const cca2 = selected.cca2;
          this.CountryCode = cca2;
          // console.log("Selected Country:", selected.name.common);
          // console.log("Selected Country Code (cca2):", cca2);
      
          // 🔔 Call the API to get the calling code
          this.api.getCallingCode(cca2).subscribe({
            next: (res: any) => {
              // console.log("📞 Calling Code Response:", res.data);
              this.numbercode=res.data.callingcodes[0]
              // console.log("numbercode:",this.numbercode);
              
            },
            error: (err) => {
              console.error("❌ Error fetching calling code:", err);
            }
          });
        }
      });
       
      }
    
  sign(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const form = this.registerForm.value;
    const payload = {
      sponcerid: form.sponcerid,
      name: form.name,
      email: form.email,
      password: form.password,
      position: form.position,
      placementid: form.placementid
    };

    this.api.UserRegistration(payload).subscribe({
      next: (res: any) => {
        this.udata = res.data;
        const newRegId = this.regid;

        this.toast.success(res?.message || 'Registration successful ✅', 'Success');
        this.registerForm.reset();

        // 👉 Show Bootstrap Modal
        const modalElement = document.getElementById('registrationModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();

          // ✅ Redirect when modal is closed (Close button OR X)
          modalElement.addEventListener('hidden.bs.modal', () => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([`/treeview/${newRegId}`]);
            });
          }, { once: true }); // run only once
        }
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Registration failed. Please try again.', 'Error');
      }
    });
  }

    
      getProfileData() {
        this.api.GetusersDataByRegID(this.regid).subscribe((res: any) => {
          this.pffdata = res.data[0];
          // console.log("gfhd:",this.pffdata)
        });
      }
    
     
  
     
        getCountries() {
         this.api.getCountries().subscribe({
        next: (res: any) => {
          this.codes = res;
  
          this.countries = res
            .map((country: any) => country.name?.common)
            .filter(Boolean)
            .sort();
  
          const countryCodes = res.map((c: any) => c.cca2).filter(Boolean);
          // console.log("Country List:", this.countries);
          // console.log("Country Codes (cca2):", countryCodes);
        },
        error: (err) => {
          console.error('API Error:', err);
        }
      });
    }
  
        Country() {
      this.api.getCountries().subscribe({
        next: (res: any) => {
          this.countries = res.map((country: { name: { common: any; }; }) => country.name?.common).filter(Boolean).sort();
          // console.log("Country List:", this.countries);
        },
        error: (err) => {
          console.error('API Error:', err);
        }
      });
    }

}
