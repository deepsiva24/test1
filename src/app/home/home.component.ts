import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1 class="welcome-title">Welcome to Vidyaranya College Portal</h1>
      <div class="news-section">
        <div class="news-title">College News</div>
        <marquee class="news-marquee" behavior="scroll" direction="left" scrollamount="6">
          Admissions open for 2024-25! | Annual Day on July 15th | New courses in Data Science and AI | Fee payment deadline: June 30th | Congratulations to our toppers!
        </marquee>
      </div>
      <img class="home-college-img" src="https://images.unsplash.com/photo-1541339907198-e0875661f971?auto=format&fit=crop&w=800&q=80" alt="School Building" />
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {} 