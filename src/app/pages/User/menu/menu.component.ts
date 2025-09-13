import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  data1: any;
  pfdata: any;
  loading = true;

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private api: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.GetProfile();

    // Close sidebar automatically on route change
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.closeSidebar());
  }

  toggleSubmenu(event: Event) {
    const parentLi = (event.currentTarget as HTMLElement).closest('.submenu');
    const submenu = parentLi?.querySelector('.submenu-list') as HTMLElement;

    if (submenu) {
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      parentLi?.classList.toggle('active');
    }
  }

  GetProfile() {
    this.loading = true;
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        this.data1 = res.data;
        this.pfdata = res.data.profiledata;
        this.loading = false;
      },
      error: () => {
        this.toast.error('Failed to fetch profile data', 'Error');
        this.loading = false;
      }
    });
  }

  Logout() {
    this.token.signOut();
  }

  mytree(regid: string) {
    this.router.navigateByUrl(`/treeview/${regid}`);
  }

  /** Close sidebar on mobile */
  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const body = document.body;

    if (sidebar && body.classList.contains('slide-nav')) {
      body.classList.remove('slide-nav');
      sidebar.classList.remove('opened');
    }
  }
}
