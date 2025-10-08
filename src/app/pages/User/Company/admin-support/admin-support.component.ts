import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.css']
})
export class AdminSupportComponent {
  modalRef: any;
  data1: any[] = [];
  pagedData: any[] = []; // data for current page
  pageSize = 10; // items per page
  currentPage = 1;
  totalPages = 0;
  pdata: any;
  form:FormGroup;
  selectedTicket: any;
  constructor(private api: UserService, private fb:FormBuilder, private router:Router) {
        this.form = this.fb.group({
      reply: ['', Validators.required],
    });
  }
  
  ngOnInit() {
     this.completedData();
     this.PendingData();
  }

  PendingData(){
    this.api.PendingTickets().subscribe((res:any)=>{
      console.log('pending',res);
      this.pdata=res.data;
    })
  }

  completedData(){
       this.api.CompletedTickets().subscribe((res: any) => {
        console.log('complete',res);
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

  replay(ticketIdOrItem: any) {
  // If full item passed:
  if (typeof ticketIdOrItem === 'object') {
    this.selectedTicket = ticketIdOrItem;

      const modalEl = document.getElementById('replayticket');
  this.modalRef = new bootstrap.Modal(modalEl);
  this.modalRef.show();

  } else {
    // If only id is passed, find the ticket from your data array
    this.selectedTicket = this.pdata.find((t:any)=> t.id === ticketIdOrItem);
  }
}

closeModal() {
  if (this.modalRef) {
    this.modalRef.hide();
    this.modalRef.dispose(); // ✅ dispose modal completely
      this.reloadPage();
    document.body.classList.remove('modal-open'); // ✅ remove body state
    document.querySelectorAll('.modal-backdrop')
      .forEach(el => el.remove()); // ✅ remove black overlay
  }
}

// Handle form submission
submitReplay() {
  if (this.form.valid && this.selectedTicket) {
    const replyContent = this.form.get('replay')?.value;
    const val = { reply: replyContent };
    this.api.UpdateTicket(this.selectedTicket.id, val).subscribe(res => {
      // Handle success like closing modal, showing message, etc.
      this.form.reset();
      // Other logic...
       this.reloadPage();
    });
  }
}

reloadPage() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/cpdash']);
  });
}

  // replay(id:any){
  //   console.log(this.form.value);
  //   if (this.form.valid) {
  //     const val = {
  //       reply: this.form.value.reply,
  //     };
  //     this.api.UpdateTicket(id,val).subscribe(
  //       a => {
  //         if (a) {
  //           console.log(a);
  //              this.form.reset();
              
  //             setTimeout(() => {
  //              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //                this.router.navigate(['/cpdash']);
  //              });
  //            }, 1000);
  //         } else {
  //           console.log(a);
          
  //         }
  //       },
  //       (err: any) => {
         
  //       },
  //     );
  //   }
  // }

}
