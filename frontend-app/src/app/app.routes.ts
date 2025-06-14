import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      { path: 'students', loadComponent: () => import('./student-list/student-list.component').then(m => m.StudentListComponent) },
      { path: 'students/:id', loadComponent: () => import('./student-profile/student-profile.component').then(m => m.StudentProfileComponent) },
      { path: 'add-student', loadComponent: () => import('./add-student/add-student.component').then(m => m.AddStudentComponent) },
      { path: 'exam-details', loadComponent: () => import('./exam-details/exam-details.component').then(m => m.ExamDetailsComponent) },
      { path: 'performance', loadComponent: () => import('./performance/performance.component').then(m => m.PerformanceComponent) },
      { path: 'fee', loadComponent: () => import('./fee/fee-details.component').then(m => m.FeeDetailsComponent) },
      { path: 'clubs', loadComponent: () => import('./clubs/clubs.component').then(m => m.ClubsComponent) },
      { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
    ]
  },
  { path: '**', redirectTo: '/login' }
];
