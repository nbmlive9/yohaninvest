import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-total-users-list',
  templateUrl: './total-users-list.component.html',
  styleUrls: ['./total-users-list.component.css']
})
export class TotalUsersListComponent {
  tuser: any;
  profileform: FormGroup;
  pffdata: any;
  isEdit = false;
  userid: any;

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  pageGroupSize = 10;
  currentGroupStart = 1;

  constructor(private api: UserService, private fb: FormBuilder, private router: Router) {
    this.profileform = this.fb.group({
      regid: [''],
      password: [''],
      name: [''],
      email: [''],
      country: [''],
      wallet1: ['']
    });
  }

  ngOnInit() {
    this.Totalusers();
  }

  Totalusers(page: number = 1) {
    this.currentPage = page;
    this.api.totalusers(page).subscribe({
      next: (res: any) => {
        console.log('totacountuser',res);
        this.tuser = {
          count: res.data.count,
          data: res.data.data,
          nextpage: res.data.nextpage,
          previouspage: res.data.previouspage,
        };
        this.updateTotalPages(res.data.count);
      },
      error: (err) => console.error('Total Users API error:', err),
    });
  }

  updateTotalPages(count: number) {
    this.totalPages = Math.ceil(count / this.pageSize);
    this.updatePageGroup();
  }

  updatePageGroup() {
    this.currentGroupStart = Math.floor((this.currentPage - 1) / this.pageGroupSize) * this.pageGroupSize + 1;
  }

  get pageArray(): number[] {
    const pages = [];
    const maxPage = Math.min(this.currentGroupStart + this.pageGroupSize - 1, this.totalPages);
    for (let i = this.currentGroupStart; i <= maxPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  gotoPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePageGroup();
    this.Totalusers(page);
  }

  prevGroup() {
    const prevGroupStart = this.currentGroupStart - this.pageGroupSize;
    if (prevGroupStart >= 1) {
      this.gotoPage(prevGroupStart);
    }
  }

  nextGroup() {
    const nextGroupStart = this.currentGroupStart + this.pageGroupSize;
    if (nextGroupStart <= this.totalPages) {
      this.gotoPage(nextGroupStart);
    }
  }

  openProfile(item: any) {
    this.userid = item.regid;
    this.isEdit = false;
    this.pffdata = item;
    this.profileform.patchValue(item);
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
        if (res.status === 1) {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cpdash']);
          });
          this.pffdata = { ...this.pffdata, ...payload };
          this.isEdit = false;
        }
      },
      error: (err) => console.error("updateprofile error:", err)
    });
  }

}
