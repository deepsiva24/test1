import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, ChatbotComponent],
  template: `
    <div class="app-layout" [class.menu-collapsed]="menuCollapsed">
      <nav class="sidebar" [class.collapsed]="menuCollapsed">
        <button class="menu-toggle" (click)="menuCollapsed = !menuCollapsed">
          <span class="material-icons">{{ menuCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
        </button>
        <div class="sidebar-menu-title">Menu</div>
        <ul>
          <li><a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"><span class="icon material-icons">home</span> Home</a></li>
          <li><a routerLink="/students" routerLinkActive="active"><span class="icon material-icons">list_alt</span> Student List</a></li>
          <li *ngIf="isAdmin"><a routerLink="/add-student" routerLinkActive="active"><span class="icon material-icons">person_add</span> Add Student</a></li>
          <li><a routerLink="/exam-details" routerLinkActive="active"><span class="icon material-icons">assignment</span> Exam Details</a></li>
          <li><a routerLink="/performance" routerLinkActive="active"><span class="icon material-icons">bar_chart</span> Performance</a></li>
          <li><a routerLink="/fee" routerLinkActive="active"><span class="icon material-icons">payments</span> Fee</a></li>
          <li><a routerLink="/clubs" routerLinkActive="active"><span class="icon material-icons">groups</span> Clubs</a></li>
          <li><a routerLink="/contact" routerLinkActive="active"><span class="icon material-icons">contact_mail</span> Contact</a></li>
          <li class="logout-item"><a (click)="logout()"><span class="icon material-icons">logout</span> Logout</a></li>
        </ul>
      </nav>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
    <app-chatbot></app-chatbot>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  `,
  styleUrls: ['./main-layout.component.scss'] // Will create this SCSS
})
export class MainLayoutComponent implements OnInit {
  menuCollapsed = false;
  isAdmin = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    const userRole = localStorage.getItem('userRole');
    this.isAdmin = userRole === 'admin';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
} 