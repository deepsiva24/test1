import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent {
  clubs = [
    {
      name: 'Coding Club',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      description: 'Explore programming languages, algorithms, and competitive coding.'
    },
    {
      name: 'Photography Club',
      imageUrl: 'https://images.unsplash.com/photo-1502943187848-d3e3cd449237?auto=format&fit=crop&w=600&q=80',
      description: 'Capture moments and express creativity through the lens.'
    },
    {
      name: 'Debate Club',
      imageUrl: 'https://images.unsplash.com/photo-1549646452-959dc6b1e6f5?auto=format&fit=crop&w=600&q=80',
      description: 'Enhance public speaking, critical thinking, and argumentative skills.'
    },
    {
      name: 'Eco Club',
      imageUrl: 'https://images.unsplash.com/photo-1532986401035-77983c27e366?auto=format&fit=crop&w=600&q=80',
      description: 'Promote environmental awareness and sustainable practices on campus.'
    }
  ];
} 