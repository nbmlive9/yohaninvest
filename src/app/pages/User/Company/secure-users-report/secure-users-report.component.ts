import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-secure-users-report',
  templateUrl: './secure-users-report.component.html',
  styleUrls: ['./secure-users-report.component.css']
})
export class SecureUsersReportComponent implements OnInit {
  data1: any;
  form: FormGroup;
  selectedUser: any; 
  modalRef: any;

  constructor(private api: UserService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      comment: ['', ],
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.SecureUsersReport().subscribe((res: any) => {
      console.log('secure',res);
      this.data1 = res.data;
    });
  }

 UpdateData() {
  if (!this.selectedUser) return;

  const payload = this.form.value;

  this.api.SecureUpdate(this.selectedUser.regid, payload).subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.closeModal(); // ✅ clean close
        this.selectedUser.comment = payload.comment;
        this.reloadPage();
      }
    },
    error: (err) => console.error("updateprofile error:", err)
  });
}

openModal(user: any) {
  this.selectedUser = user;
  this.form.patchValue({ comment: user.comment || '' });

  const modalEl = document.getElementById('secureupdate');
  this.modalRef = new bootstrap.Modal(modalEl);
  this.modalRef.show();
}

closeModal() {
  if (this.modalRef) {
    this.modalRef.hide();
    this.modalRef.dispose(); // ✅ dispose modal completely
    document.body.classList.remove('modal-open'); // ✅ remove body state
    document.querySelectorAll('.modal-backdrop')
      .forEach(el => el.remove()); // ✅ remove black overlay
  }
}

reloadPage() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/cpdash']);
  });
}


}
