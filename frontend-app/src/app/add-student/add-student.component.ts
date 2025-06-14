import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Add Student</h2>
    <form (ngSubmit)="onSubmit()" #studentForm="ngForm" class="student-form">
      <div class="form-tile-container">
        <div class="form-tile">
          <div class="form-group">
            <label>Admission ID <span class="required-asterisk">*</span></label>
            <input name="admission_id" [(ngModel)]="student.admission_id" required />
          </div>
          <div class="form-group">
            <label>Name <span class="required-asterisk">*</span></label>
            <input name="name" [(ngModel)]="student.name" required />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input name="phone_number" [(ngModel)]="student.phone_number" />
          </div>
          <div class="form-group">
            <label>Place</label>
            <input name="place" [(ngModel)]="student.place" />
          </div>
        </div>
        <div class="form-tile">
          <div class="form-group">
            <label>Email</label>
            <input name="email" [(ngModel)]="student.email" type="email" />
          </div>
          <div class="form-group">
            <label>Date of Birth <span class="required-asterisk">*</span></label>
            <input name="date_of_birth" [(ngModel)]="student.date_of_birth" type="date" required />
          </div>
          <div class="form-group">
            <label>Class</label>
            <input name="class_name" [(ngModel)]="student.class_name" />
          </div>
          <div class="form-group">
            <label>Photo URL</label>
            <input name="photo_url" [(ngModel)]="student.photo_url" />
          </div>
        </div>
        <div class="form-tile">
          <div class="form-group">
            <label>Father's Name <span class="required-asterisk">*</span></label>
            <input name="father_name" [(ngModel)]="student.father_name" required />
          </div>
          <div class="form-group">
            <label>Year of Study</label>
            <input name="year_of_study" [(ngModel)]="student.year_of_study" type="number" />
          </div>
          <div class="form-group">
            <label>Branch <span class="required-asterisk">*</span></label>
            <input name="branch" [(ngModel)]="student.branch" required />
          </div>
          <div class="form-group">
            <label>Section</label>
            <input name="section" [(ngModel)]="student.section" />
          </div>
          <div class="form-group">
            <label>Gender</label>
            <select name="gender" [(ngModel)]="student.gender">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" [disabled]="studentForm.invalid">Submit</button>
      <div *ngIf="success" class="success-msg">Student added successfully!</div>
      <div *ngIf="error" class="error-msg">Failed to add student.</div>
    </form>

    <div class="bulk-upload-section">
      <h3>Bulk Upload Students (CSV)</h3>
      <div class="file-input-group">
        <input type="file" (change)="onFileSelected($event)" accept=".csv" id="csvFileInput">
        <button (click)="onBulkUpload()" [disabled]="!selectedFile">Upload CSV</button>
      </div>
      <div *ngIf="bulkUploadSuccess" class="success-msg">Students uploaded successfully!</div>
      <div *ngIf="bulkUploadError" class="error-msg">Failed to upload students. Please check the CSV format and try again.</div>
    </div>
  `,
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  student: any = {
    father_name: '',
    year_of_study: null,
    branch: '',
    section: '',
    gender: '',
  };
  success = false;
  error = false;
  bulkUploadSuccess = false;
  bulkUploadError = false;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.success = false;
    this.error = false;
    this.http.post('http://localhost:8000/students', this.student).subscribe({
      next: () => {
        this.success = true;
        this.student = {
          father_name: '',
          year_of_study: null,
          branch: '',
          section: '',
          gender: '',
        };
      },
      error: () => {
        this.error = true;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.bulkUploadSuccess = false;
    this.bulkUploadError = false;
  }

  onBulkUpload() {
    if (!this.selectedFile) {
      alert('Please select a CSV file to upload.');
      return;
    }

    this.bulkUploadSuccess = false;
    this.bulkUploadError = false;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8000/upload-students-csv', formData).subscribe({
      next: (response) => {
        this.bulkUploadSuccess = true;
        console.log('Bulk upload successful', response);
        this.selectedFile = null;
        (document.getElementById('csvFileInput') as HTMLInputElement).value = '';
      },
      error: (err) => {
        this.bulkUploadError = true;
        console.error('Bulk upload failed', err);
      }
    });
  }
} 