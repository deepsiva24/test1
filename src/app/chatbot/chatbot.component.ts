import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbot-container" [class.minimized]="isMinimized">
      <div class="chatbot-header" (click)="toggleMinimized()">
        <div class="chatbot-info">
          <span class="material-icons chatbot-icon">{{ botIcon }}</span>
          <span class="chatbot-name">{{ botName }}</span>
        </div>
        <button class="minimize-toggle material-icons">{{ isMinimized ? 'expand_less' : 'minimize' }}</button>
      </div>

      <div class="chatbot-body" *ngIf="!isMinimized">
        <div class="messages">
          <div *ngFor="let message of chatMessages" class="message {{ message.sender }}">
            {{ message.text }}
          </div>
        </div>
        <div class="input-area">
          <input
            type="text"
            [(ngModel)]="newMessage"
            (keyup.enter)="sendMessage()"
            placeholder="Type your message..."
          />
          <button (click)="sendMessage()" class="send-button material-icons">send</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  botName = 'Guru-GPT';
  botIcon = 'psychology'; // Changed to a more appealing Material Icon name
  isMinimized = false;

  chatMessages: { text: string; sender: 'user' | 'bot' }[] = [
    { text: 'Hi there! How can I help you today?', sender: 'bot' }
  ];
  newMessage = '';

  toggleMinimized() {
    this.isMinimized = !this.isMinimized;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatMessages.push({ text: this.newMessage, sender: 'user' });
      this.newMessage = '';
      // Simulate a bot response (replace with actual bot logic later)
      setTimeout(() => {
        this.chatMessages.push({ text: 'I received your message!', sender: 'bot' });
      }, 500);
    }
  }
} 