import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Student {
  id: string;
  name: string;
  photo_url?: string;
  attendance: { date: string; status: string }[];
  fees: { amount: number; status: string; due_date: string }[];
  performances: { exam_name: string; score: number; max_score: number }[];
}

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  studentId: string | null = null;
  student: Student | undefined;
  loading: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get('id');
      this.loadStudentData();
    });
  }

  loadStudentData(): void {
    // Dummy data for demonstration
    this.student = {
      id: this.studentId || 'N/A',
      name: 'John Doe',
      photo_url: 'https://via.placeholder.com/100',
      attendance: [
        { date: '2023-01-01', status: 'Present' },
        { date: '2023-01-02', status: 'Absent' },
      ],
      fees: [
        { amount: 1000, status: 'Paid', due_date: '2023-03-01' },
        { amount: 500, status: 'Due', due_date: '2023-06-01' },
      ],
      performances: [
        { exam_name: 'Math Midterm', score: 85, max_score: 100 },
        { exam_name: 'Science Final', score: 92, max_score: 100 },
      ],
    };
    this.loading = false;
  }
} 