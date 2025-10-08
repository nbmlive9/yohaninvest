import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-funds-transfer-report',
  templateUrl: './funds-transfer-report.component.html',
  styleUrls: ['./funds-transfer-report.component.css']
})
export class FundsTransferReportComponent {
data1: any[] = [];
pagedData: any[] = []; // data for current page
pageSize = 10; // items per page
currentPage = 1;
totalPages = 0;

constructor(private api: UserService) {}

ngOnInit() {
  this.api.TransferReportTotal().subscribe((res: any) => {
    this.data1 = res.data || [];
    this.totalPages = Math.ceil(this.data1.length / this.pageSize);
    this.setPagedData();
  });
}

setPagedData() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedData = this.data1.slice(startIndex, endIndex);
}

gotoPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.setPagedData();
}


}
