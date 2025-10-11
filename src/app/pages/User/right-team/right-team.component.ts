import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-right-team',
  templateUrl: './right-team.component.html',
  styleUrls: ['./right-team.component.css']
})
export class RightTeamComponent {

    pagedData: any[] = [];
      data1: any[] = [];
  loading = true;
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
   visiblePages: number[] = [];
  pageGroupStart = 1;
  pagesPerGroup = 10;
  constructor(private api: UserService) {}

  ngOnInit() {
    this.getLeftTeamData();
  }

  getLeftTeamData() {
    this.loading = true;
    this.api.Rightteam().subscribe({
      next: (res: any) => {
        console.log(res);
        this.data1 = res.data || [];
           this.calculatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.data1 = [];
        this.loading = false;
      }
    });
  }

 calculatePagination() {
    this.totalPages = Math.ceil(this.data1.length / this.itemsPerPage);
    this.currentPage = 1;
    this.pageGroupStart = 1;
    this.updateVisiblePages();
    this.updatePagedData();
  }

  updatePagedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedData = this.data1.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();

    // If user goes outside visible range, shift visible page numbers
    if (page < this.pageGroupStart) {
      this.pageGroupStart = Math.max(1, this.pageGroupStart - this.pagesPerGroup);
    } else if (page >= this.pageGroupStart + this.pagesPerGroup) {
      this.pageGroupStart = this.pageGroupStart + this.pagesPerGroup;
    }

    this.updateVisiblePages();
  }

  changeItemsPerPage(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.calculatePagination();
  }

  updateVisiblePages() {
    const start = this.pageGroupStart;
    const end = Math.min(start + this.pagesPerGroup - 1, this.totalPages);
    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  nextPageGroup() {
    if (this.pageGroupStart + this.pagesPerGroup <= this.totalPages) {
      this.pageGroupStart += this.pagesPerGroup;
      this.updateVisiblePages();
    }
  }

  prevPageGroup() {
    if (this.pageGroupStart > 1) {
      this.pageGroupStart -= this.pagesPerGroup;
      if (this.pageGroupStart < 1) this.pageGroupStart = 1;
      this.updateVisiblePages();
    }
  }

}
