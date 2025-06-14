import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs'; // Import for debouncing

interface Student {
  admission_id: string;
  name: string;
  photo_url?: string;
  phone_number?: string;
  place?: string;
  email?: string;
  date_of_birth?: string;
  class_name?: string;
  branch: string;
  year_of_study?: number;
  father_name: string;
  section?: string;
  gender?: string; // New property for gender
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  allStudents: Student[] = []; // Store all fetched students
  students: Student[] = []; // Students currently displayed (paginated)
  search: string = '';
  loading = false;
  showShimmer: boolean = false; // New property to control shimmer visibility

  // Pagination properties
  pageSize: number = 10; // Number of students per page
  currentPage: number = 1;
  totalPages: number = 1;
  errorMessage: string = ''; // New property to store error messages

  private searchTerms = new Subject<string>(); // Subject for debouncing search input

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchStudents();

    // Subscribe to search terms for debounced search
    this.searchTerms.pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged() // Only emit if value is different from previous value
    ).subscribe(() => {
      this.currentPage = 1; // Reset to first page on search
      this.fetchStudents(); // Re-fetch data and apply filter
    });
  }

  ngOnDestroy() {
    this.searchTerms.unsubscribe(); // Clean up to prevent memory leaks
  }

  fetchStudents() {
    this.loading = true;
    this.showShimmer = true; // Start showing shimmer
    this.errorMessage = ''; // Clear previous errors

    const params = this.search ? `?search=${this.search}` : '';

    this.http.get<Student[]>(`http://localhost:8000/students${params}`).subscribe({
      next: (data) => {
        // No need to filter locally, backend handles it
        this.allStudents = data;

        this.totalPages = Math.ceil(this.allStudents.length / this.pageSize);
        this.paginateStudents();
        this.loading = false;
        this.showShimmer = false; // Stop shimmer immediately when data is received

        if (this.allStudents.length === 0 && !this.search) {
          this.errorMessage = "No data available.";
        } else if (this.allStudents.length === 0 && this.search) {
          this.errorMessage = "No students found matching your search.";
        }
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        this.loading = false;
        this.showShimmer = false; // Stop shimmer on error
        this.errorMessage = "Failed to load students. Please try again later.";
      }
    });
  }

  paginateStudents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.students = this.allStudents.slice(startIndex, endIndex);
  }

  onSearchChange() {
    this.searchTerms.next(this.search); // Emit the current search term
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateStudents();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateStudents();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateStudents();
    }
  }

  openProfile(student: Student) {
    this.router.navigate(['/students', student.admission_id]);
  }
} 