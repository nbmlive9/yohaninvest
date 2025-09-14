import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cp-dashboard',
  templateUrl: './cp-dashboard.component.html',
  styleUrls: ['./cp-dashboard.component.css']
})
export class CpDashboardComponent {

   dashboardData: any = {};
  withdrawUsersData: any = [];
  tuser: any;
  profileform: FormGroup;
  pffdata: any;
  isEdit: boolean = false;
  countries: string[] = [];
  codes: string[] = [];
  userid:any;
  totalmembers:any;
  form:FormGroup;
    errorMessage: any;
  idData: any;
  payid: any;
  rejid: any;
  constructor(private api: UserService, private fb: FormBuilder, private toast: ToastrService,private router:Router) {
    this.profileform = this.fb.group({
      regid: [''],   // <-- Add this
      name: [''],
      email: [''],
      country: [''],
      wallet1: ['']
    });

    this.form = this.fb.group({
      regid: ['', Validators.required],   // <-- Add this
      points: ['', Validators.required],
    });
    
  }

  ngOnInit() {
    this.getDashboard();
    this.getWithdrawUsers();
    this.getWithdrawPaid();
    this.Totalusers();  
    this.getCountries();
    this.TotalMembers();

  }


    pay(id:any){
    this.api.PayWithdraw(id).subscribe((res:any)=>{
        // console.log(res);
        this.payid=res.data;
              setTimeout(() => {
               this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                 this.router.navigate(['/dashboard']);
               });
             }, 2000);
    })
  }

    reject(id:any){
    this.api.RejectWithdraw(id).subscribe((res:any)=>{
        // console.log(res);
        this.rejid=res.data;
        setTimeout(() => {
         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
           this.router.navigate(['/dashboard']);
         });
       }, 2000);
    })
  }

  getDashboard() {
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res.status === 1) this.dashboardData = res.data;
      },
      error: (err) => console.error('Dashboard API error:', err),
    });
  }

  getWithdrawUsers() {
    this.api.withdrawUsers().subscribe((res:any)=>{
      // console.log('withdrawusers',res);
      this.withdrawUsersData=res.data;
      
    });
  }

  getWithdrawPaid() {
    this.api.withdrawUsers().subscribe({
      next: (res: any) => {
        if (res.status === 1) this.withdrawUsersData = res.data;
      },
      error: (err) => console.error('Withdraw API error:', err),
    });
  }

copyToClipboard(walletAddress: string) {
  navigator.clipboard.writeText(walletAddress).then(() => {
    this.toast.success('Wallet address copied!', 'Copied');
  });
}

  Totalusers(page: number = 1) {
    this.api.totalusers(page).subscribe({
      next: (res: any) => {
        this.tuser = {
          data: res.data.data,                // 👈 the actual array
          nextpage: res.data.nextpage,        // 👈 URL string
          previouspage: res.data.previouspage // 👈 URL string or null
        };
        // console.log("tuser:", this.tuser);
      },
      error: (err) => console.error('Total Users API error:', err),
    });
  }
  
  getPageNumber(url: string): number | null {
    if (!url) return null;
    try {
      const params = new URL(url).searchParams;
      return Number(params.get("page"));
    } catch (e) {
      console.error("Invalid URL:", url);
      return null;
    }
  }
  
  loadPage(url: string) {
    const page = this.getPageNumber(url);
    if (page) {
      this.Totalusers(page);
    }
  }
  
  

  openProfile(item: any) {
    // console.log("item:",item.regid);
    this.userid=item.regid
    
    this.isEdit = false;   
    this.pffdata = item;   

    this.profileform.patchValue({
      regid: item.regid,  // <-- Add this
      name: item.name,
      email: item.email,
      country: item.country,
      wallet1: item.wallet1
    });
    
    this.profileform.markAsPristine();
  }

  edit() {
    this.isEdit = true;
  }
  
  save() {
    const payload = this.profileform.value;
    const id = this.userid;   
  
    this.api.cupdateprofile(id, payload).subscribe({
      next: (res: any) => {
        // console.log("updateprofile:", res);
        if (res.status === 1) {
          this.toast.success("Profile updated successfully");
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dashboard']);
          });
          this.pffdata = { ...this.pffdata, ...payload };  
          this.isEdit = false;  
        } else {
          this.toast.error("Update failed");
        }
      },
      error: (err) => {
        console.error("updateprofile error:", err);
        this.toast.error("Error updating profile");
      }
    });
  }

  Active(): void {
      if (this.form.invalid) {
        this.form.markAllAsTouched(); // highlight errors
        return;
      }
      const form = this.form.value;
      const payload = {
        regid: form.regid,
        points: form.points,
      };
      this.api.ActivatePremiumId(payload).subscribe({
        next: (res: any) => {
          // console.log('Registration Response:', res);
          this.toast.success(res?.message || 'Activate Premium Account successful ✅', 'Success');
          this.form.reset();
        },
        error: (err) => {
          console.error('Activate Premium Account error:', err);
          this.toast.error(err?.error?.message || 'Activate Premium Account failed. Please try again.', 'Error');
        }
      });
    }

  getCountries() {
    this.api.getCountries().subscribe({
      next: (res: any) => {
        this.codes = res.map((c: any) => c.cca2).filter(Boolean);
        this.countries = res.map((c: any) => c.name?.common).filter(Boolean).sort();
      },
      error: (err) => console.error('API Error:', err)
    });
  }

  TotalMembers() {
    this.api.totalMembers().subscribe({
      next: (res: any) => {
        this.totalmembers=res
        // console.log("Total Members:", res);
      },
      error: (err) => console.error("API Error:", err)
    });
  }

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
    const regid = this.form.get('regid')?.value;
    if (regid && regid.length >= 4) {
      this.GetregistredData(regid);
    } else {
      this.idData = null;
      this.errorMessage = null;
    }
  }

 selectAll: boolean = false;

// Toggle all checkboxes
toggleSelectAll() {
  this.withdrawUsersData.forEach((row:any) => row.selected = this.selectAll);
}

// Update selectAll checkbox if any row is unselected
updateSelectAll() {
  this.selectAll = this.withdrawUsersData.every((row:any) => row.selected);
}

// Pay selected rows
paySelected() {
  const selectedIds = this.withdrawUsersData
    .filter((row:any) => row.selected)
    .map((row:any) => row.id);

  if (selectedIds.length === 0) { alert('No rows selected'); return; }

  selectedIds.forEach((id:any) => this.pay(id));
}

// Reject selected rows
rejectSelected() {
  const selectedIds = this.withdrawUsersData
    .filter((row:any) => row.selected)
    .map((row:any) => row.id);

  if (selectedIds.length === 0) { alert('No rows selected'); return; }

  selectedIds.forEach((id:any) => this.reject(id));
}

// Export only selected rows to Excel
exportSelectedToExcel() {
  const selectedRows = this.withdrawUsersData.filter((row:any) => row.selected);

  if (selectedRows.length === 0) { alert('No rows selected'); return; }

  const exportData = selectedRows.map((row: { cdate: string | number | Date; regid: any; amount: any; accountno: any; status: string; }, index: number) => ({
    'S.No': index + 1,
    'Date': new Date(row.cdate).toLocaleDateString(),
    'User ID': row.regid,
    'Amount (USD)': row.amount,
    'Wallet Address': row.accountno,
    'Status': row.status === '1' ? 'Success' : 'Pending'
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const workbook: XLSX.WorkBook = { Sheets: { 'WithdrawData': worksheet }, SheetNames: ['WithdrawData'] };
  XLSX.writeFile(workbook, 'Selected_Withdraw_Users.xlsx');
}

}
